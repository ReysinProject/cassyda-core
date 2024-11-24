export {AuthClient} from "@/core/AuthClient";
export {createAuth} from "@/core/createAuth";

export {LocalStorageStrategy} from "@/storage/LocalStorageStrategy";
export {CookieStorageStrategy} from "@/storage/CookieStorageStrategy";

export {OAuth2Provider} from "@/providers/OAuth2Provider";
export {FacebookProvider} from "@/providers/FacebookProvider";
export {GoogleProvider} from "@/providers/GoogleProvider";
export {DiscordProvider} from "@/providers/DiscordProvider";
export {GitHubProvider} from "@/providers/GitHubProvider";

export {AuthConfig, AuthProvider, AuthGuard, AuthEndpoints, AuthResponse, AuthScheme, AuthSchemeOptions, AuthorizeOptions, StorageStrategy} from "@/types";