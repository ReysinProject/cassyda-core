import {AuthProvider, AuthorizeOptions, AuthResponse, OAuth2Config} from "@/types";

// OAuth2 Provider Base Class
export abstract class OAuth2Provider implements AuthProvider {
    id: string;
    name: string;
    type: 'oauth' = 'oauth';

    protected clientId: string;
    protected clientSecret: string;
    protected redirectUri: string;
    protected scope: string[];
    protected additionalParams: Record<string, string>;

    protected abstract authorizeEndpoint: string;
    protected abstract tokenEndpoint: string;
    protected abstract userInfoEndpoint: string;

    constructor(id: string, name: string, config: OAuth2Config) {
        this.id = id;
        this.name = name;
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.redirectUri = config.redirectUri;
        this.scope = config.scope || [];
        this.additionalParams = config.additionalParams || {};
    }

    async authorize(options: AuthorizeOptions): Promise<AuthResponse> {
        if (options.params?.code) {
            return this.handleCallback(options.params.code);
        }

        this.redirectToProvider();
        // This won't actually be reached due to redirect
        return Promise.reject('Redirect in progress');
    }

    protected redirectToProvider(): void {
        const params = new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            response_type: 'code',
            scope: this.scope.join(' '),
            ...this.additionalParams,
        });

        window.location.href = `${this.authorizeEndpoint}?${params.toString()}`;
    }

    protected async handleCallback(code: string): Promise<AuthResponse> {
        const tokenResponse = await fetch(this.tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'authorization_code',
                code,
                redirect_uri: this.redirectUri,
            }),
        });

        const tokens = await tokenResponse.json();
        const userInfo = await this.getUserInfo(tokens.access_token);

        return {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiresIn: tokens.expires_in,
            user: userInfo,
        };
    }

    protected async getUserInfo(accessToken: string): Promise<any> {
        const response = await fetch(this.userInfoEndpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.json();
    }

    async validateToken(token: string): Promise<boolean> {
        try {
            const response = await fetch(this.userInfoEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.ok;
        } catch {
            return false;
        }
    }

    async refreshAccessToken(refreshToken: string): Promise<AuthResponse> {
        const response = await fetch(this.tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
        });

        const tokens = await response.json();
        return {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiresIn: tokens.expires_in,
        };
    }
}