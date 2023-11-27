// This file is responsible for checking if the app is in development mode or not
export const isDev = process.env.NODE_ENV === 'development';
export let url = isDev ? 'http://localhost:5173' : 'https://url.com'; // Change this to your own url