import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import { locales, usePathname, useRouter } from '@/i18n/navigation';
import { Locales } from '@/types/i18n';

const SwitchLanguageButton = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function toggleLocale(): Locales {
        return locale === locales[0] ? locales[1] : locales[0];
    }

    function switchLanguage() {
        router.replace({
            pathname,
        },{ locale: toggleLocale() });
    }

    return (
        <Button onClick={switchLanguage} variant="outline">
            {locale.toUpperCase()}
        </Button>
    );
};

export default SwitchLanguageButton;
