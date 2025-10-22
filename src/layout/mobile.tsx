import * as React from "react"
import {NavLink} from "react-router";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
    Home,
    Search,
    Plus,
    User,
    Menu
} from "lucide-react"
import { cn } from "@/lib/utils" // utility از shadcn برای classNames

// Interface برای تب‌ها
interface NavItem {
    title: string
    href: string
    icon: React.ReactNode
}

const navItems: NavItem[] = [
    { title: "خانه", href: "/", icon: <Home className="h-4 w-4" /> },
    { title: "جستجو", href: "/search", icon: <Search className="h-4 w-4" /> },
    { title: "اضافه", href: "/add", icon: <Plus className="h-4 w-4" /> },
    { title: "پروفایل", href: "/profile", icon: <User className="h-4 w-4" /> },
]

export default function MobileLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    //const pathname = usePathname()

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header ساده (اختیاری) */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container flex h-14 items-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden mr-2">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64 md:hidden">
                            {/* در موبایل، sidebar رو برای منوهای اضافی استفاده کن */}
                            <div className="flex flex-col gap-2 p-4">
                                {navItems.map((item) => (
                                    <NavLink key={item.href} to={item.href}>
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "w-full justify-start",
                                                //pathname === item.href && "bg-accent"
                                            )}
                                        >
                                            {item.icon}
                                            <span className="ml-2">{item.title}</span>
                                        </Button>
                                    </NavLink>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="flex-1 text-center">
                        <h1 className="text-lg font-semibold">اپ موبایل</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
                {children}
            </main>

            {/* Bottom Navigation - فقط در موبایل */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center justify-around py-2">
                    {navItems.map((item) => (
                        <NavLink key={item.href} to={item.href}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "flex flex-col items-center gap-1 rounded-md p-0 h-auto w-auto",
                                    //pathname === item.href && "text-primary"
                                )}
                            >
                                {item.icon}
                                <span className="text-xs">{item.title}</span>
                            </Button>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </div>
    )
}