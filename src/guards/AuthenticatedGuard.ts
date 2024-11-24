import {BaseAuthGuard} from "@/guards/BaseAuthGuard";

/**
 * A guard that checks if the user is authenticated.
 * @extends BaseAuthGuard
 */
export class AuthenticatedGuard extends BaseAuthGuard {
    /**
     * Determines if the guard can activate.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user is authenticated, false otherwise.
     */
    async canActivate(): Promise<boolean> {
        return await this.authClient.isAuthenticated();
    }
}
