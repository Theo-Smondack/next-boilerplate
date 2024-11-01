'use client';
import React from 'react';

import LogOutButton from '@/app/(front)/(ui)/log-out-button';

const NavBar = () => {
    return (
        <nav className="flex flex-row justify-end p-6">
            <LogOutButton />
        </nav>
    );
};

export default NavBar;
