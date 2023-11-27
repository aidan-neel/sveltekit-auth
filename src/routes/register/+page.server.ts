import { url } from '$lib/isDev.js';

// Registration page actions
export const actions = {
    /**
     * A POST request to this action will register a new user.
     * @param {Request} request
     * @param {Cookies} cookies
     * @returns {Response}
     */
    register: async ({ request, cookies }) => {
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');

        const res = await fetch(`${url}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        
        console.log(res.body)
        const json = await res.json()
        cookies.set('session', json.sessionCookie)
        
        return new Response(JSON.stringify({
            data: json,
        }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}