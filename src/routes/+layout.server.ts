// src/routes/+layout.server.ts

import { url } from '$lib/isDev.js';

export async function load({ fetch }) {
    // Initialize loading state
    let isLoading = true;

    const res = await fetch(`${url}/api/me`, {
        method: 'GET',
        credentials: 'include',
    });

    // Update loading state
    isLoading = false;

    if (res.ok) {
        const data = await res.json();
        return {
            props: { userData: data, isLoading } // Pass the loading state
        };
    } else {
        return { props: { userData: undefined, isLoading } };
    }
}
