// Function to convert a cookie header into an object
export function parseCookies(cookieHeader): any {
    const cookies = {};
    if (cookieHeader) {
        cookieHeader.split(';').forEach((cookie) => {
            const parts = cookie.split('=');
            cookies[parts.shift().trim()] = decodeURI(parts.join('='));
        });
    } else {
        return { session: '' };
    }
    return cookies;
}

// stores
import { writable } from "svelte/store";

export const loginLoading = writable(false);
export const registrationLoading = writable(false);
export const loading = writable(true);