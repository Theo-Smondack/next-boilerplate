import React from 'react';

export interface LayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}
