import { ThemeProvider } from "@/components/theme-provider";
// import { ModeToggle } from "@/components/mode-toggle";
// import UserMenu from "@/components/UserMenu";
// import { GalleryVerticalEnd } from "lucide-react";
import {Outlet} from "react-router";



const Layout = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <Outlet />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Layout