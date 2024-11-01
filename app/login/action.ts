'use server';

import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

type ActionResult = {
    error?: string;
};

export async function login(formData: FormData): Promise<ActionResult> {
    try {
        await signIn('credentials', {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            redirect: false,
        });
    } catch (error) {
        console.error(error);
        if (error instanceof AuthError) {
            return {
                error: error.cause?.err?.message,
            };
        }
    }
    redirect(DEFAULT_LOGIN_REDIRECT);
}
