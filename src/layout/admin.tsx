import {NavLink, Outlet} from "react-router";
// import './Admin.css'
import { useTranslation } from "react-i18next";





const Admin = () =>{


    const { t } = useTranslation();

    return (
        <div className="min-h-full">
            <NavLink to={"/"}>{t("site.home")}</NavLink>
            <br/>
            <NavLink to={"/about"}>About</NavLink>
            <br/>
            <NavLink to={"/admin"}>Admin</NavLink>
            <br/>
            <NavLink to={"/admin/panel"}>Admin/Panel</NavLink>
            <br/>
            <Outlet/>
        </div>
    )
}


export default Admin