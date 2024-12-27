import './globals.css';

import dynamic from 'next/dynamic';

import { auth } from '@/auth';
import NavBar from '@/components/ui/nav-bar';
import { Toaster } from '@/components/ui/toaster';
import { projectDescription, projectTitle } from '@/config/env';
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

export default async function RootLayout({ children }: LayoutProps) {
    const session = await auth();
    const isLogged = !!session;

    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <main className="flex min-h-screen flex-col">
                        <NavBar isLogged={isLogged} />
                        {children}
                    </main>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
