import { parseCookies } from '$lib/extra';
import { prismaAuth } from '$lib/server/prisma.js';

/**
 * When this endpoint is called, it will return the current users data.
 * Requires the user to be logged in, if not, it will return an error.
 */
export async function GET({ request }) {
    const cookieHeader = request.headers.get('cookie');
    const cookies = parseCookies(cookieHeader)
    const session = cookies['session']

    console.log('Session: ', session)
    console.log('Cookies: ', cookieHeader)
    
    if(session !== '') {
        const data = await prismaAuth.getSessionData(session);
        if(data === null) {
            return new Response(JSON.stringify({
                data: 'Not logged in.'
            }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({
                data: data,
            }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } else {
        return new Response(JSON.stringify({
            data: 'Not logged in.'
        }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}