'use server';

import { LayoutProps } from '@/types';

export default async function TodosLayout({ children }: LayoutProps) {
    return <div className="flex flex-col items-center justify-center">{children}</div>;
}
