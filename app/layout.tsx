import './globals.css';

import { LayoutProps } from '@/types';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Next boilerplate',
    description: 'Next boilerplate',
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
