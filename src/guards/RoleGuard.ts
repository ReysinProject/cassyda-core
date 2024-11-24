import {BaseAuthGuard} from "@/guards/BaseAuthGuard";
import {AuthClient} from "@/core/AuthClient";

/**
 * A guard that checks if the user has one of the required roles.
 * @extends BaseAuthGuard
 */
export class RoleGuard extends BaseAuthGuard {
    /**
     * The list of roles required to activate the guard.
     * @type {string[]}
     */
    private roles: string[];

    /**
     * Creates an instance of RoleGuard.
     * @param {AuthClient} authClient - The authentication client to be used by the guard.
     * @param {string[]} roles - The list of roles required to activate the guard.
     */
    constructor(authClient: AuthClient, roles: string[]) {
        super(authClient);
        this.roles = roles;
    }

    /**
     * Determines if the guard can activate based on the user's roles.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user has at least one of the required roles, false otherwise.
     */
    async canActivate(): Promise<boolean> {
        const token = await this.authClient.getAccessToken();
        if (!token) return false;

        // Assuming token contains user roles
        const decodedToken = this.decodeToken(token);
        return this.roles.some(role => decodedToken.roles.includes(role));
    }

    /**
     * Decodes the JWT token to extract the roles.
     * @param {string} token - The JWT token to decode.
     * @returns {any} - The decoded token payload.
     */
    private decodeToken(token: string): any {
        // Implementation would depend on your token structure
        // This is a simplified example
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return { roles: [] };
        }
    }
}
