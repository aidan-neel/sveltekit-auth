// Implement signing out, clear the session cookies.
// Implement a loading state for the sign out button.
// Delete the session from the database.
// Clean up the rest of the sessions.

import { signOut } from '$lib/server/user.js';
import { toast } from '$lib/toast.js';

export async function POST({ request, cookies }) {
    const sessionCookie = cookies.get('session')

    if(sessionCookie !== undefined) {
        if(sessionCookie !== null) {
            try {
                const response = await signOut(sessionCookie)
                if(response.status === 'error') {
                    toast(response.message);
                    return new Response(JSON.stringify({
                        status: 'error',
                        data: response.message,
                    }), {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                }

                if(response.status === 'success') {
                    cookies.set('session', '', {
                        path: '/',
                        expires: new Date(0),
                    })
                    toast(response.message);
                    return new Response(JSON.stringify({
                        status: 'success',
                        data: response.message,
                    }), {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                }
            } catch(err) {
                console.log(err);
            }
        } else {
            return new Response(JSON.stringify({
                status: 'error',
                data: 'Not logged in.',
            }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } else {
        return new Response(JSON.stringify({
            status: 'error',
            data: 'Not logged in.',
        }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}