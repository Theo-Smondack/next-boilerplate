import React from 'react';

import { LayoutProps } from '@/types';

const FrontLayout = ({ children }: LayoutProps) => {
    return (
        <div className="flex-1 flex flex-col justify-center">
            {children}
        </div>
    );
};

export default FrontLayout;
