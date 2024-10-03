import { auth } from '@/auth';
import { authRoutes, DEFAULT_LOGIN_REDIRECT } from '@/routes';

export default auth((req): any => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    console.log('isLoggedIn', isLoggedIn);
    console.log('path', nextUrl.pathname);

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = !isAuthRoute;

    // If the route is an auth route and the user is already logged in, redirect to the default login redirect URL
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (isPublicRoute && !isLoggedIn) {
        console.log('redirecting to login');
        // If the user is already logged in, redirect to the default login redirect URL
        return Response.redirect(new URL('/login', nextUrl));
    }

    return null;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
    // matcher match all the routes where the middleware will be invoked!
};
