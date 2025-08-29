import {NavLink, Outlet} from "react-router";
import UserMenu from "@/components/UserMenu.tsx";
// import './Admin.css'
import { useTranslation } from "react-i18next";





const Main = () =>{


    const { t } = useTranslation();

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
        </div>
    )
}


export default Main