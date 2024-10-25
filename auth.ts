import Credentials from '@auth/core/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';

import prisma from '@/prisma/prisma';

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
        // Type guard
        if (typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
            throw new Error('Invalid credentials');
        }
        // Fetch user from db
        const user = await getUserFromDb(credentials.email);
        if (!user) {
            throw new Error('User not found.');
        }
        // Check password
        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        // Return user
        return user;
    },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt',
    },
    adapter: PrismaAdapter(prisma),
    providers: [credentials],
    secret: process.env.AUTH_SECRET,
});
