import Credentials from '@auth/core/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { isRedirectError } from 'next/dist/client/components/redirect';
import NextAuth, { CredentialsSignin } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { ZodError } from 'zod';

import { getLocaleCookie } from '@/i18n/cookies';
import prisma from '@/prisma/prisma';
import { getLoginSchema } from '@/schema/login';

export class InvalidLoginError extends CredentialsSignin {
    constructor(code: string) {
        super();
        this.code = code;
        this.message = code;
    }
}

async function getUserFromDb(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
}

const credentials = Credentials({
    credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
    },
    async authorize(credentials) {
        const tLoginError = await getTranslations('login.message.error');
        const loginSchema = getLoginSchema(tLoginError);
        try {
            const { email, password } = await loginSchema.parseAsync(credentials);

            // Fetch user from db
            const user = await getUserFromDb(email);
            if (!user) {
                throw new InvalidLoginError(tLoginError('user-not-found'));
            }
            // Check password
            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
                throw new InvalidLoginError(tLoginError('invalid-password'));
            }
            // Return user
            return user;
        } catch (error) {
            console.log(error);
            if (error instanceof InvalidLoginError) {
                throw new Error(error.code);
            }
            if (error instanceof ZodError) {
                throw new Error(error.errors[0].message);
            }
            if (isRedirectError(error)) {
                throw error;
            }
            throw new Error('An error occurred');
        }
    },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt',
    },
    adapter: PrismaAdapter(prisma),
    providers: [credentials],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async redirect({ url, baseUrl }) {
            const locale = getLocaleCookie();

            // Add locale to the redirect URL like /en/login
            if (url.startsWith('/')) return `${baseUrl}/${locale}${url}`;

            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url

            return baseUrl
        },
    },
});
