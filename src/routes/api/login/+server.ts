import { url } from '$lib/isDev.js';
import { prismaAuth } from '$lib/server/prisma.js';

/**
 * When this endpoint is called, it will check if the user is already logged in, and if not, it will log them in.
 * Requires an email and password in the request body.
 */
export async function POST({ request }) {
    const data = await request.json();

    await prismaAuth.cleanupExpiredSessions();
    
    const email = data.email;
    const password = data.password;

    const res = await fetch(`${url}/api/me`, {
        method: 'GET',
        credentials: 'include',
    });
    
    if (res.ok) {
        const data = await res.json();
        if(data === 'Not logged in.') {
            return new Response(JSON.stringify({
                'User already logged in.': data,
            }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            try {
                const { token, session, user } = await prismaAuth.loginUser(email, password);
                if(token && session && user) {
                    console.log("Creating session cookie.")
                    const sessionCookie = await prismaAuth.createSessionCookie(session);
                    if(sessionCookie) {
                        return new Response(JSON.stringify({
                            status: 200,
                            user,
                            session,
                            sessionCookie,
                        }), {
                            headers: {
                                'Content-Type': 'application/json',
                                'Set-Cookie': sessionCookie,
                            },
                        });
                    }
                } else {
                    return new Response(JSON.stringify({
                        status: 401,
                        error: 'Invalid email or password.',
                    }), {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                }
            } catch (err) {
                console.log(err);
                return new Response(JSON.stringify({
                    status: 401,
                    error: 'Invalid email or password.',
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        }
    }
}