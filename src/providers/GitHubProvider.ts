import {OAuth2Provider} from "@/providers/OAuth2Provider";
import {OAuth2Config} from "@/types";

export class GitHubProvider extends OAuth2Provider {
    protected authorizeEndpoint = 'https://github.com/login/oauth/authorize';
    protected tokenEndpoint = 'https://github.com/login/oauth/access_token';
    protected userInfoEndpoint = 'https://api.github.com/user';

    constructor(config: OAuth2Config) {
        super('github', 'GitHub', {
            ...config,
            scope: config.scope || ['read:user', 'user:email'],
        });
    }

    protected async getUserInfo(accessToken: string): Promise<any> {
        const [userResponse, emailsResponse] = await Promise.all([
            fetch(this.userInfoEndpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }),
            fetch(`${this.userInfoEndpoint}/emails`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }),
        ]);

        const user = await userResponse.json();
        const emails = await emailsResponse.json();

        return {
            ...user,
            email: emails.find((email: any) => email.primary)?.email,
        };
    }
}