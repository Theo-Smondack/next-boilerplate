import Credentials from '@auth/core/providers/credentials';
import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import { encode as defaultEncode } from 'next-auth/jwt';

import prisma from '@/prisma/prisma';

const adapter = PrismaAdapter(prisma);

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter,
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const parsedCredentials = credentials as { email: string; password: string };

                const user = await prisma.user.findFirst({
                    where: {
                        email: parsedCredentials.email,
                    },
                });

                if (
                    !user ||
                    (user.password && !(await compare(parsedCredentials.password, user.password)))
                ) {
                    return null;
                }
                return user;
            },
        }),
        GitHub,
    ],
    jwt: {
        encode: async function (params) {
            if (params.token?.credentials) {
                const sessionToken = crypto.randomUUID();

                if (!params.token.sub) {
                    throw new Error('No user ID found in token');
                }

                const createdSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                });

                if (!createdSession) {
                    throw new Error('Failed to create session');
                }

                return sessionToken;
            }
            return defaultEncode(params);
        },
    },
    callbacks: {
        async jwt({ token, user, account }) {
            console.log('jwt callback', user, account);
            if (account?.provider === 'credentials') {
                token.credentials = true;
            }
            return token;
        },
    },

    secret: process.env.SECRET,
});
