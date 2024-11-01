import React from 'react';

import NavBar from '@/app/(front)/(ui)/nav-bar';
import { LayoutProps } from '@/types';

const FrontLayout = ({ children }: LayoutProps) => {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>{children}</main>
        </div>
    );
};

export default FrontLayout;
