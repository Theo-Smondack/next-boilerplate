import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { LayoutProps } from '@/types';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Next boilerplate',
    description: 'Next boilerplate',
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body>
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    );
}
