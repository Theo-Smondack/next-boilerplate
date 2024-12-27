'use client';
import { FC } from 'react';

import LogOutButton from '@/app/(front)/(ui)/log-out-button';
import SwitchThemeButton from '@/components/ui/switch-theme-button';

interface NavBarProps {
    isLogged?: boolean;
}

const NavBar: FC<NavBarProps> = ({ isLogged }) => {
    return (
        <nav className="flex flex-row gap-2 p-6">
            <div className="flex-1 flex gap-2">
                <SwitchThemeButton />
            </div>
            {
                isLogged && (<LogOutButton />)
            }
        </nav>
    );
};

export default NavBar;
