import { ThemeProvider } from "@/components/theme-provider"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {LoginForm} from "@/components/login-form.tsx";
import {GalleryVerticalEnd} from "lucide-react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

                <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">

                    <div className="flex w-full max-w-sm flex-col gap-6">
                        <a href="#" className="flex items-center gap-2 self-center font-medium"><ModeToggle></ModeToggle>
                            <div
                                className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-4"/>
                            </div>
                            Acme Inc.
                        </a>
                        <LoginForm/>
                        <RouterProvider router={router} />
                    </div>
                </div>
            </ThemeProvider>

        </>

    )
}

export default App