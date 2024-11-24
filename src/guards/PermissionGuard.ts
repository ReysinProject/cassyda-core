import {BaseAuthGuard} from "@/guards/BaseAuthGuard";
import {AuthClient} from "@/core/AuthClient";

/**
 * A guard that checks if the user has the required permissions.
 * @extends BaseAuthGuard
 */
export class PermissionGuard extends BaseAuthGuard {
    /**
     * The list of permissions required to activate the guard.
     * @type {string[]}
     */
    private permissions: string[];

    /**
     * Creates an instance of PermissionGuard.
     * @param {AuthClient} authClient - The authentication client to be used by the guard.
     * @param {string[]} permissions - The list of permissions required to activate the guard.
     */
    constructor(authClient: AuthClient, permissions: string[]) {
        super(authClient);
        this.permissions = permissions;
    }

    /**
     * Determines if the guard can activate based on the user's permissions.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user has all required permissions, false otherwise.
     */
    async canActivate(): Promise<boolean> {
        const token = await this.authClient.getAccessToken();
        if (!token) return false;

        const decodedToken = this.decodeToken(token);
        return this.permissions.every(permission =>
            decodedToken.permissions.includes(permission)
        );
    }

    /**
     * Decodes the JWT token to extract the permissions.
     * @param {string} token - The JWT token to decode.
     * @returns {any} - The decoded token payload.
     */
    private decodeToken(token: string): any {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return { permissions: [] };
        }
    }
}
