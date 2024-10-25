export { auth as middleware } from '@/auth';

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
    // matcher match all the routes where the middleware will be invoked!
};
