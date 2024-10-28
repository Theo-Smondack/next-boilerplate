import { auth } from '@/auth';
import { authRoutes, DEFAULT_LOGIN_REDIRECT } from '@/routes';

//region Handle auth middleware (redirects, etc)
export default auth((req) => {
    const { nextUrl, auth } = req;
    const isLogged = !!auth;
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = !isAuthRoute;

    // If the route is an auth route and the user is already logged in, redirect to the default login redirect URL
    if (isAuthRoute && isLogged) {
        console.log('redirecting to default login redirect');
        if (isLogged) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
    }

    // If the route is a public route and the user is not logged in, redirect to the login route
    if (isPublicRoute && !isLogged) {
        console.log('redirecting to login');
        return Response.redirect(new URL(authRoutes[0], nextUrl));
    }
});
//endregion

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
    // matcher match all the routes where the middleware will be invoked!
};
