// Storage Strategy Interface
export interface StorageStrategy {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}

// Authentication Provider Interface
export interface AuthProvider {
    id: string;
    name: string;
    type: 'oauth' | 'credentials' | 'passwordless';
    authorize(options: AuthorizeOptions): Promise<AuthResponse>;
    validateToken(token: string): Promise<boolean>;
}

// Authentication Scheme Interface
export interface AuthScheme {
    id: string;
    name: string;
    guards: AuthGuard[];
    providers: AuthProvider[];
    options: AuthSchemeOptions;
}

// Core Configuration
export interface AuthConfig {
    schemes: Record<string, AuthScheme>;
    defaultScheme: string;
    storage: StorageStrategy;
    endpoints?: AuthEndpoints;
}

export interface AuthEndpoints {
    login?: string;
    logout?: string;
    callback?: string;
    refresh?: string;
}

export interface AuthSchemeOptions {
    tokenType: 'Bearer' | 'JWT';
    accessTokenKey?: string;
    refreshTokenKey?: string;
    expiresKey?: string;
}

export interface AuthorizeOptions {
    provider: string;
    scheme: string;
    params?: Record<string, any>;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
    user?: any;
}

// Auth Guard Interface
export interface AuthGuard {
    canActivate(): Promise<boolean>;
}

// OAuth2 Configuration Interface
export interface OAuth2Config {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scope?: string[];
    additionalParams?: Record<string, string>;
}