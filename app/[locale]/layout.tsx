import './globals.css';

import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { auth } from '@/auth';
import NavBar from '@/components/ui/nav-bar';
import { Toaster } from '@/components/ui/toaster';
import { projectDescription, projectTitle } from '@/config/env';
import { navigation } from '@/i18n/navigation';
import { LayoutProps } from '@/types';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: projectTitle,
    description: projectDescription,
};

// Use mod to only import the ThemeProvider component and not the whole module
const ThemeProvider = dynamic(
    () => import('@/components/context/theme-provider').then((mod) => mod.ThemeProvider),
    {
        ssr: false,
    },
);

export default async function RootLayout({ children, params: { locale } }: LayoutProps) {
    if (!navigation.locales.includes(locale as never)) {
        notFound();
    }
    const session = await auth();
    const isLogged = !!session;

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider>
                        <main className="flex min-h-screen flex-col">
                            <NavBar isLogged={isLogged} />
                            {children}
                        </main>
                        <Toaster />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
