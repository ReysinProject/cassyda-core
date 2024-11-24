import {OAuth2Config} from "@/types";
import {OAuth2Provider} from "@/providers/OAuth2Provider";

export class FacebookProvider extends OAuth2Provider {
    protected authorizeEndpoint = 'https://facebook.com/v18.0/dialog/oauth';
    protected tokenEndpoint = 'https://graph.facebook.com/v18.0/oauth/access_token';
    protected userInfoEndpoint = 'https://graph.facebook.com/me';

    constructor(config: OAuth2Config) {
        super('facebook', 'Facebook', {
            ...config,
            scope: config.scope || ['email', 'public_profile'],
        });
    }

    protected async getUserInfo(accessToken: string): Promise<any> {
        const response = await fetch(
            `${this.userInfoEndpoint}?fields=id,name,email,picture&access_token=${accessToken}`
        );
        return response.json();
    }
}