/**
 * An array of routes that are accessible to authenticated users
 * These routes require authentication
 * @type {string[]}
 */
export const authRoutes = [
    '/api/auth/signin',
    '/api/auth/signout',
    '/api/auth/callback/credentials',
];

/**
 * The default login redirect URL
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
