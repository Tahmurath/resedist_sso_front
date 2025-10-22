import {Outlet} from "react-router";

import { Toaster } from "@/components/ui/sonner"
// import BottomNavigation from "@/components/BottomNavigation.tsx";




const Main = () =>{




    return (
        <div className="min-h-full">

            {/*<UserMenu />*/}
            {/*<NavLink to={"/"}>{t("site.home")}</NavLink> | <NavLink to={"/about"}>{t("site.admin")}</NavLink>*/}
            {/*<br/>*/}
            {/*<NavLink to={"/admin"}>Admin</NavLink> |*/}
            {/*<br/>*/}
            {/*<NavLink to={"/admin/panel"}>Admin/Panel</NavLink> |*/}
            {/*<br/>*/}
            <Outlet />
            <Toaster />

        </div>
    )
}


export default Main