import { url } from "../isDev";
import { toast } from "../toast";
import { prismaAuth } from "./prisma";

/**
 * Global login function. Intended for server side, and allows for logging in from any serversided file.
 * Requires an email and password.
 * @param {string} email
 * @param {string} password
 */
export async function login(email: any, password: any) {
    const res = await fetch(`${url}/api/me`, {
        method: 'GET',
        credentials: 'include',
    });
    
    if (res.ok) {
        const data = await res.json();
        if (data === 'Not logged in.') {
            // User already logged in
            return {
                status: 'error',
                message: 'User already logged in.'
            };
        } else {
            try {
                const { token, session, user } = await prismaAuth.loginUser(email, password);
                if (token && session && user) {
                    // Login successful
                    const sessionCookie = await prismaAuth.createSessionCookie(session);
                    if (sessionCookie) {
                        toast('Successfully logged in.');
                        return {
                            status: 'success',
                            message: 'Successfully logged in.',
                            user,
                            session,
                            sessionCookie
                        };
                    }
                } else {
                    // Invalid email or password
                    toast('Invalid email or password.');
                    return {
                        status: 'error',
                        message: 'Invalid email or password.'
                    };
                }
            } catch (err) {
                console.log(err);
                toast('Invalid email or password.');
                return {
                    status: 'error',
                    message: 'Invalid email or password.'
                };
            }
        }
    } else {
        // Request failed
        return {
            status: 'error',
            message: 'Failed to check login status.'
        };
    }
}

//

interface SignOutResponse {
    status: string;
    message: string;
}

/**
 * Global sign out function. Intended for server side, and allows for signing out from any serversided file.
 * Requires a session cookie.
 * @param {string} session
 * @returns {Promise<{status: string, message: string}>}
 */
export async function signOut(session: string): Promise<SignOutResponse> {
    session = session.replace('session=', '').split(';')[0];
    try {
        const userSignedOut = await prismaAuth.signUserOut(session);
        console.log(session);
        console.log(userSignedOut)
        if(userSignedOut) {
            const response: SignOutResponse = {
                status: 'success',
                message: 'Successfully signed out.'
            }

            return response;
        } else {
            const response: SignOutResponse = {
                status: 'error',
                message: 'Failed to sign out.'
            }

            return response;
        }
    } catch (err) {
        console.log(err);
    }
    
    const defaultResponse: SignOutResponse = {
        status: 'error',
        message: 'Failed to sign out.'
    }

    return defaultResponse;
}                           