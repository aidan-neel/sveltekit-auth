import { loginLoading } from '$lib/extra.js';
import { url } from '$lib/isDev.js';
import { toast } from '$lib/toast.js';

// Login page actions
export const actions = {
    /**
     * A POST request to this action will log the user in.
     * @param {Request} request
     * @param {Cookies} cookies
     * @returns {Response}
     */
    register: async ({ request, cookies }) => {
        loginLoading.set(true)
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
        
        const json = await res.json()
        loginLoading.set(false)

        const RESPONSE_STATUS = json.status; // This is the status code from the server.
        const ERROR_MESSAGE = json.error; // This is the error message from the server.
        const STATUS_OK = 200; // RESPONSE_STATUS === 200: OK, successfully logged in.
        const STATUS_INTERNAL_ERROR = 500; // RESPONSE_STATUS === 500: Interal server error.

        // console.log(RESPONSE_STATUS)

        if(RESPONSE_STATUS === STATUS_OK && json.sessionCookie !== undefined || '') {
            console.log('Authorized.')
            toast('Successfully logged in.');
            cookies.set('session', json.sessionCookie)

            return {
                success: true,
                status: STATUS_OK,
                message: 'Successfully logged in.',
            }
        }

        if(RESPONSE_STATUS === STATUS_INTERNAL_ERROR && ERROR_MESSAGE !== undefined || '') {
            // console.log('Unauthorized.')
            // console.log(json);
            toast('Invalid email or password.')
            return {
                success: false,
                status: STATUS_INTERNAL_ERROR,
                error: ERROR_MESSAGE,
            }
        }
    }
}