import {OAuth2Provider} from "@/providers/OAuth2Provider";
import {OAuth2Config} from "@/types";

export class GoogleProvider extends OAuth2Provider {
    protected authorizeEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    protected tokenEndpoint = 'https://oauth2.googleapis.com/token';
    protected userInfoEndpoint = 'https://www.googleapis.com/oauth2/v3/userinfo';

    constructor(config: OAuth2Config) {
        super('google', 'Google', {
            ...config,
            scope: config.scope || ['openid', 'email', 'profile'],
        });
    }
}