import {AuthGuard} from "@/types";
import {AuthClient} from "@/core/AuthClient";

/**
 * An abstract base class for authentication guards.
 * @implements {AuthGuard}
 */
export abstract class BaseAuthGuard implements AuthGuard {
    /**
     * The authentication client used by the guard.
     * @type {AuthClient}
     */
    protected authClient: AuthClient;

    /**
     * Creates an instance of BaseAuthGuard.
     * @param {AuthClient} authClient - The authentication client to be used by the guard.
     */
    constructor(authClient: AuthClient) {
        this.authClient = authClient;
    }

    /**
     * Determines if the guard can activate.
     * @abstract
     * @returns {Promise<boolean>} - A promise that resolves to true if the guard can activate, false otherwise.
     */
    abstract canActivate(): Promise<boolean>;
}
