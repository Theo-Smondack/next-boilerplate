import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { projectDescription, projectTitle } from '@/config/env';
import { LayoutProps } from '@/types';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: projectTitle,
    description: projectDescription,
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
