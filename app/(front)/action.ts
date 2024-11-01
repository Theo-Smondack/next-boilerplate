'use server';

import { signOut } from '@/auth';
import { DEFAULT_LOGOUT_REDIRECT } from '@/routes';

export async function logout() {
    await signOut({
        redirectTo: DEFAULT_LOGOUT_REDIRECT,
    });
}
