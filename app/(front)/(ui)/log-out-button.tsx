import { logout } from '@/app/(front)/action';
import { Button } from '@/components/ui/button';

const LogOutButton = () => {
    const handleLogOut = async () => {
        await logout();
    };

    return (
        <Button className="w-[120px]" variant="destructive" onClick={handleLogOut}>
            Log out
        </Button>
    );
};

export default LogOutButton;
