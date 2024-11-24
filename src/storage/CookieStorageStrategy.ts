import { StorageStrategy } from "@/types";

interface CookieOptions {
    path?: string;
    domain?: string;
    maxAge?: number;
    expires?: Date;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
    httpOnly?: boolean;
}

export class CookieStorageStrategy implements StorageStrategy {
    private readonly defaultOptions: CookieOptions;

    constructor(options: CookieOptions = {}) {
        this.defaultOptions = {
            path: '/',
            secure: true,
            sameSite: 'Lax',
            ...options
        };
    }

    async getItem(key: string): Promise<string | null> {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(`${key}=`));

        if (!cookie) {
            return null;
        }

        const [, value] = cookie.split('=');
        try {
            return decodeURIComponent(value.trim());
        } catch {
            return null;
        }
    }

    async setItem(key: string, value: string, options?: CookieOptions): Promise<void> {
        const mergedOptions = { ...this.defaultOptions, ...options };
        let cookie = `${key}=${encodeURIComponent(value)}`;

        if (mergedOptions.path) {
            cookie += `;path=${mergedOptions.path}`;
        }

        if (mergedOptions.domain) {
            cookie += `;domain=${mergedOptions.domain}`;
        }

        if (mergedOptions.maxAge !== undefined) {
            cookie += `;max-age=${mergedOptions.maxAge}`;
        }

        if (mergedOptions.expires) {
            cookie += `;expires=${mergedOptions.expires.toUTCString()}`;
        }

        if (mergedOptions.secure) {
            cookie += ';secure';
        }

        if (mergedOptions.sameSite) {
            cookie += `;samesite=${mergedOptions.sameSite}`;
        }

        document.cookie = cookie;
    }

    async removeItem(key: string): Promise<void> {
        // Set expires to a past date to remove the cookie
        await this.setItem(key, '', {
            ...this.defaultOptions,
            expires: new Date(0),
            maxAge: 0
        });
    }

    async clear(): Promise<void> {
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const key = cookie.split('=')[0].trim();
            await this.removeItem(key);
        }
    }
}
