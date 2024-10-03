'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import prisma from '@/prisma/prisma';

export interface LoginData {
    email: string;
    password: string;
}

export async function LoginAction(data: LoginData) {
    const { email, password } = data;
    try {
        const existUser = await prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!existUser || !existUser.password) {
            return { error: 'user not found' };
        }

        const isPasswordMatch = bcrypt.compare(password, existUser.password);
        if (!isPasswordMatch) {
            return { error: 'password is incorrect' };
        }

        await signIn('credentials', { email, password });

        return { success: true };
    } catch (error) {
        console.error(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: ' invalid credentials' };
                default:
                    return { error: 'something went wrong.' };
            }
        }
    }
}
