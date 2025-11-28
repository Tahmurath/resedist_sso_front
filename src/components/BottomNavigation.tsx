import { NavLink } from 'react-router';
import { Home, User, Settings } from 'lucide-react';
import {useTranslation} from "react-i18next";

const BottomNavigation = () => {

    const { t } = useTranslation();

    const navItems = [
        { path: '/tg/miniapp/in/home', label: t("site.home"), icon: <Home className="h-6 w-6" /> },
        { path: '/tg/miniapp/in/active-rooms', label: t("site.activeRooms"), icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg> },
        // { path: '/tg/miniapp/in/history', label: t("site.history"), icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { path: '/tg/miniapp/in/profile', label: t("site.profile"), icon: <User className="h-6 w-6" /> },
        { path: '/tg/miniapp/in/settings', label: t("site.settings"), icon: <Settings className="h-6 w-6" /> },

    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 shadow-sm">
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