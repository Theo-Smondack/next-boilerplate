import { getRequestConfig } from 'next-intl/server';

import { defaultTimeZone, navigation } from '@/i18n/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !navigation.locales.includes(locale as never)) {
        locale = navigation.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
        timeZone: defaultTimeZone,
    };
});
