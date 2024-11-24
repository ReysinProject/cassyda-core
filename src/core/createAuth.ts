import {AuthClient, AuthConfig} from "@/index";

export const createAuth = (config: AuthConfig): AuthClient => {
    return new AuthClient(config);
};