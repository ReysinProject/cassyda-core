export {AuthClient} from "@/core/AuthClient";
export {createAuth} from "@/core/createAuth";

export {AuthenticatedGuard} from "@/guards/AuthenticatedGuard";
export {BaseAuthGuard} from "@/guards/BaseAuthGuard";
export {PermissionGuard} from "@/guards/PermissionGuard";
export {RoleGuard} from "@/guards/RoleGuard";

export {OAuth2Provider} from "@/providers/OAuth2Provider";
export {FacebookProvider} from "@/providers/FacebookProvider";
export {GoogleProvider} from "@/providers/GoogleProvider";
export {DiscordProvider} from "@/providers/DiscordProvider";
export {GitHubProvider} from "@/providers/GitHubProvider";

export {LocalStorageStrategy} from "@/storage/LocalStorageStrategy";
export {CookieStorageStrategy} from "@/storage/CookieStorageStrategy";

export {AuthConfig, AuthProvider, AuthGuard, AuthEndpoints, AuthResponse, AuthScheme, AuthSchemeOptions, AuthorizeOptions, StorageStrategy, OAuth2Config} from "@/types";