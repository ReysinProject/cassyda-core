import {AuthConfig, AuthorizeOptions, AuthResponse, AuthScheme} from "@/index";

export class AuthClient {
    private config: AuthConfig;
    private currentScheme?: AuthScheme;

    constructor(config: AuthConfig) {
        this.config = config;
        this.currentScheme = config.schemes[config.defaultScheme];
    }

    // Switch between different authentication schemes
    public useScheme(schemeName: string): AuthClient {
        if (!this.config.schemes[schemeName]) {
            throw new Error(`Scheme ${schemeName} not found`);
        }
        this.currentScheme = this.config.schemes[schemeName];
        return this;
    }

    // Login using the current scheme and specified provider
    public async login(options: AuthorizeOptions): Promise<AuthResponse> {
        const scheme = this.config.schemes[options.scheme];
        const provider = scheme.providers.find(p => p.id === options.provider);

        if (!provider) {
            throw new Error(`Provider ${options.provider} not found in scheme ${options.scheme}`);
        }

        const response = await provider.authorize(options);
        await this.setTokens(response);
        return response;
    }

    // Logout from the current session
    public async logout(): Promise<void> {
        await this.config.storage.clear();
    }

    // Check if user is authenticated
    public async isAuthenticated(): Promise<boolean> {
        const token = await this.getAccessToken();
        if (!token) return false;

        const scheme = this.currentScheme;
        if (!scheme) return false;

        return scheme.providers.some(async provider => await provider.validateToken(token));
    }

    // Get the current access token
    public async getAccessToken(): Promise<string | null> {
        const key = this.currentScheme?.options.accessTokenKey || 'access_token';
        return this.config.storage.getItem(key);
    }

    private async setTokens(response: AuthResponse): Promise<void> {
        const scheme = this.currentScheme;
        if (!scheme) throw new Error('No scheme selected');

        await this.config.storage.setItem(
            scheme.options.accessTokenKey || 'access_token',
            response.accessToken
        );

        if (response.refreshToken) {
            await this.config.storage.setItem(
                scheme.options.refreshTokenKey || 'refresh_token',
                response.refreshToken
            );
        }
    }


    /**
     * Checks all guards defined in the current scheme
     * @returns Promise<boolean> - Returns true if all guards pass
     * @throws Error if no scheme is selected
     */
    public async checkGuard(): Promise<boolean> {
        if (!this.currentScheme) {
            throw new Error('No authentication scheme selected');
        }

        const guards = this.currentScheme.guards;

        // If no guards defined, consider it open access
        if (!guards || guards.length === 0) {
            return true;
        }

        try {
            // Check each guard in sequence
            for (const guard of guards) {
                const canActivate = await guard.canActivate();
                if (!canActivate) {
                    return false; // Stop checking if any guard fails
                }
            }

            return true; // All guards passed
        } catch (error) {
            console.error('Guard check failed:', error);
            throw new Error(`Failed to verify guards: ${error}`);
        }
    }
}