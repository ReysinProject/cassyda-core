import {OAuth2Provider} from "@/providers/OAuth2Provider";
import {OAuth2Config} from "@/types";

export class DiscordProvider extends OAuth2Provider {
    protected authorizeEndpoint = 'https://discord.com/api/oauth2/authorize';
    protected tokenEndpoint = 'https://discord.com/api/oauth2/token';
    protected userInfoEndpoint = 'https://discord.com/api/users/@me';

    constructor(config: OAuth2Config) {
        super('discord', 'Discord', {
            ...config,
            scope: config.scope || ['identify', 'email'],
            additionalParams: {
                ...config.additionalParams,
                prompt: 'consent',
            },
        });
    }
}