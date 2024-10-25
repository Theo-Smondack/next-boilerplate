import Credentials from '@auth/core/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth, { CredentialsSignin } from 'next-auth';

import prisma from '@/prisma/prisma';

class InvalidLoginError extends CredentialsSignin {
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
        // Type guard
        if (typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
            throw new InvalidLoginError('Invalid credentials');
        }
        // Fetch user from db
        const user = await getUserFromDb(credentials.email);
        if (!user) {
            throw new InvalidLoginError('User not found.');
        }
        // Check password
        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new InvalidLoginError('Invalid password');
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
