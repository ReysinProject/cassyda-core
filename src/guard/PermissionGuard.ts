import {BaseAuthGuard} from "@/guard/BaseAuthGuard";
import {AuthClient} from "@/core/AuthClient";

export class PermissionGuard extends BaseAuthGuard {
    private permissions: string[];

    constructor(authClient: AuthClient, permissions: string[]) {
        super(authClient);
        this.permissions = permissions;
    }

    async canActivate(): Promise<boolean> {
        const token = await this.authClient.getAccessToken();
        if (!token) return false;

        const decodedToken = this.decodeToken(token);
        return this.permissions.every(permission =>
            decodedToken.permissions.includes(permission)
        );
    }

    private decodeToken(token: string): any {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return { permissions: [] };
        }
    }
}
