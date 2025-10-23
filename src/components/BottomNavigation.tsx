import { NavLink } from 'react-router';
import { Home, User, Settings } from 'lucide-react';
import {useTranslation} from "react-i18next";

const BottomNavigation = () => {

    const { t } = useTranslation();

    const navItems = [
        { path: '/tg/miniapp/in/home', label: t("site.home"), icon: <Home className="h-6 w-6" /> },
        { path: '/tg/miniapp/in/profile', label: t("site.profile"), icon: <User className="h-6 w-6" /> },
        { path: '/tg/miniapp/in/settings', label: t("site.settings"), icon: <Settings className="h-6 w-6" /> },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border ">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center flex-1 text-muted-foreground ${
                                isActive ? 'text-primary' : ''
                            }`
                        }
                    >
                        {item.icon}
                        <span className="text-xs mt-1">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNavigation;