import { prisma } from '$lib/server/prisma.js';

/**
 * A GET request to this endpoint, along with the correct query parameter will return the user data for the specified user ID.
 * Requires a user ID in the query parameters.
 * Example: /api/user?u={user_id}
 */
export async function GET({ url }) {
    const user = Number(url.searchParams.get('u'))
    
    if(!user) {
        return new Response(JSON.stringify({
            error: 'No user provided.',
        }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const userRecord = await prisma.user.findUnique({
        where: {
            id: user,
        },
    });

    if(!userRecord) {
        return new Response(JSON.stringify({
            error: 'User not found.',
        }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({
        user: userRecord,
    }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}