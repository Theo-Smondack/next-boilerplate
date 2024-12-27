import { useTranslations } from 'next-intl';

import { logout } from '@/app/[locale]/(front)/action';
import { Button } from '@/components/ui/button';

const LogOutButton = () => {
    const t = useTranslations('navbar');
    const handleLogOut = async () => {
        await logout();
    };

    return (
        <Button className="w-[120px]" variant="destructive" onClick={handleLogOut}>
            {t('logout')}
        </Button>
    );
};

export default LogOutButton;
