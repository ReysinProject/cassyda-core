import {BaseAuthGuard} from "@/guard/BaseAuthGuard";

export class AuthenticatedGuard extends BaseAuthGuard {
    async canActivate(): Promise<boolean> {
        return await this.authClient.isAuthenticated();
    }
}