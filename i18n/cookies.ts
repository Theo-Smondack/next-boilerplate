import { cookies } from 'next/headers';

import { defaultLocale } from '@/i18n/navigation';
import { Locales } from '@/types/i18n';

export function getLocaleCookie() : Locales {
    return cookies().get('NEXT_LOCALE')?.value as Locales ?? defaultLocale;
}
