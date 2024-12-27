import { z } from 'zod';

export function getLoginSchema(t: (key: string) => string){
    return z.object({
        email: z
            .string()
            .email({ message: t('invalid-email-address') })
            .min(1, { message: t('email-required') }),
        password: z.string().min(1, { message: t('password-required') }),
    });
}
