import { locales } from '@/i18n/navigation';

export type Locales = typeof locales[number];

export type Languages = {
    [keyof in Locales]: string;
}
