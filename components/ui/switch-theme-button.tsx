import { Moon, Sun } from '@mynaui/icons-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Theme } from '@/types';

const SwitchThemeButton = () => {
    const { setTheme, theme } = useTheme();

    const currentTheme = theme as Theme;

    function switchTheme() {
        setTheme(currentTheme === Theme.Dark ? Theme.Light : Theme.Dark);
    }

    return (
        <Button onClick={switchTheme} variant="outline">
            {currentTheme === Theme.Dark ? <Sun/> : <Moon/>}
        </Button>
    );
};

export default SwitchThemeButton;
