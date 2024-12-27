import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Home() {
    const t = useTranslations('home');
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <h1 className="mt-4 text-4xl font-bold">{t('title')}</h1>
            <p className="mt-2 text-center text-lg">
                {t('subtitle')} <code>app/[locale]/(front)/page.tsx</code>
            </p>
            <Link href="/todos">
                <p className="mt-4 cursor-pointer text-center text-lg text-blue-600 underline">
                    {t('link-text')}
                </p>
            </Link>
        </div>
    );
}
