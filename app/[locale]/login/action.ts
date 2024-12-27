'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes';
import { getLocaleCookie } from '@/i18n/cookies';
import { redirect } from '@/i18n/navigation';

type ActionResult = {
    error?: string;
};

export async function login(formData: FormData): Promise<ActionResult> {
    const locale = getLocaleCookie();
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
    return redirect({
        locale,
        href: DEFAULT_LOGIN_REDIRECT,
    });
}
