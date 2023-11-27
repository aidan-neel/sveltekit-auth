import { parseCookies } from '$lib/extra';
import { prismaAuth } from '$lib/server/prisma.js';
import { toast } from '$lib/toast.js';

/**
 * Random string generator
 * @param {number} length The length of the string to generate
 */
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

/**
 * A POST request to this endpoint will attempt to register a new user.
 * Requires an email and password in the body.
 */
export async function POST({ request }) {
    await prismaAuth.cleanupExpiredSessions();

    const data = await request.json();
    
    const email = data.email;
    const password = data.password;

    const cookieHeader = request.headers.get('cookie');
    const cookies = parseCookies(cookieHeader)
    const session = cookies['session']

    if(session !== '') {
        console.log('Already logged in.')
        return new Response(JSON.stringify({
            error: 'Already logged in.',
        }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const user = await prismaAuth.registerUser(
            email,
            password,
            email.split('@')[0],
        );

        const session = await prismaAuth.createSession(user.user.id, user.token);
        const sessionCookie = await prismaAuth.createSessionCookie(session);
        if(sessionCookie) {
            console.log(sessionCookie)
            return new Response(JSON.stringify({
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

        toast('Successfully registered.');
    } catch(err) {
        console.log(err);

        return new Response(JSON.stringify({
            error: err.message,
        }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}   