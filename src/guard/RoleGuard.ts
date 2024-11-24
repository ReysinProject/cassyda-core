import {BaseAuthGuard} from "@/guard/BaseAuthGuard";
import {AuthClient} from "@/core/AuthClient";

export class RoleGuard extends BaseAuthGuard {
    private roles: string[];

    constructor(authClient: AuthClient, roles: string[]) {
        super(authClient);
        this.roles = roles;
    }

    async canActivate(): Promise<boolean> {
        const token = await this.authClient.getAccessToken();
        if (!token) return false;

        // Assuming token contains user roles
        const decodedToken = this.decodeToken(token);
        return this.roles.some(role => decodedToken.roles.includes(role));
    }

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