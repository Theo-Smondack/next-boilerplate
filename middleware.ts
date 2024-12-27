import { NextURL } from 'next/dist/server/web/next-url';
import createMiddleware from 'next-intl/middleware';

import { auth } from '@/auth';
import { authRoutes, DEFAULT_API_ROUTES, DEFAULT_LOGIN_REDIRECT } from '@/config/routes';
import { getLocaleCookie } from '@/i18n/cookies';
import { getPathname, locales, navigation } from '@/i18n/navigation';

const intlMiddleware = createMiddleware(navigation);

export default auth((req) => {
    const { nextUrl, auth } = req;
    const locale = getLocaleCookie()

    const authRoutesWithLocales = authRoutes.map((route) =>
        locales.map((locale) =>
            getPathname({
                locale,
                href: route,
            }),
        ),
    )[0];

    const isLogged = !!auth;
    const isAuthRoute = authRoutesWithLocales.includes(nextUrl.pathname);
    const isPublicRoute = !isAuthRoute && !nextUrl.pathname.startsWith(DEFAULT_API_ROUTES);

    // If the route is an auth route and the user is already logged in, redirect to the default login redirect URL
    if (isAuthRoute && isLogged) {
        console.log('redirecting to default login redirect');
        if (isLogged) {
            return Response.redirect(getUrlWithLocal(DEFAULT_LOGIN_REDIRECT, locale, nextUrl));
        }
    }

    // If the route is a public route and the user is not logged in, redirect to the login route
    if (isPublicRoute && !isLogged) {
        console.log('redirecting to login');
        return Response.redirect(getUrlWithLocal(authRoutes[0], locale, nextUrl));
    }
    return intlMiddleware(req);
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

function getUrlWithLocal(url:string, locale:string, nextUrl:NextURL) {
    return new URL(`/${locale}${url}`, nextUrl);
}
