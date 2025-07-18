import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // مسیر به کامپوننت‌های shadcn

const UserMenu = () => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState<string>(
        localStorage.getItem("language") || "en"
    );

    // لیست زبان‌ها
    const languages = [
        { code: "en", name: "English" },
        { code: "fa", name: "فارسی" },
        { code: "de", name: "Deutsch" },
    ];

    // خواندن زبان ذخیره‌شده از localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") || "en";
        setCurrentLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
    }, [i18n]);

    // تغییر زبان
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setCurrentLanguage(lng);
        localStorage.setItem("language", lng);
    };

    return (
        <div className="flex items-center space-x-4">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-sm font-semibold  focus:outline-none">
                    {languages.find((lang) => lang.code === currentLanguage)?.name}
                    <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-28 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 text-left ${
                                currentLanguage === lang.code ? "font-bold" : ""
                            }`}
                        >
                            {lang.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserMenu;