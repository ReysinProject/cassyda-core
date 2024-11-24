import {AuthGuard} from "@/types";
import {AuthClient} from "@/core/AuthClient";

export abstract class BaseAuthGuard implements AuthGuard {
    protected authClient: AuthClient;

    constructor(authClient: AuthClient) {
        this.authClient = authClient;
    }

    abstract canActivate(): Promise<boolean>;
}