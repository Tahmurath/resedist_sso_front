import { RouterProvider } from "react-router";
import { router } from "./routes";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { queryClient } from "./queryClient/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import HttpBackend from 'i18next-http-backend';



var savedLanguage = localStorage.getItem("language");
if (!savedLanguage) {
    savedLanguage = 'en'
}

i18n
    .use(HttpBackend) // استفاده از HTTP Backend برای بارگذاری فایل‌ها
    .use(initReactI18next) // الحاق به React
    .init({
        fallbackLng: savedLanguage,
        debug: false,
        interpolation: {
            escapeValue: false, // برای React نیازی به escaping نیست
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json', // مسیر فایل‌های زبان
        },
    });

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>

        </>

    )
}

export default App