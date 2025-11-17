// import {NavLink} from "react-router";


import {NavLink} from "react-router";
import { Button } from "@/components/ui/button";


function Index() {

    return (
        <>
            <div>
                <NavLink to={'/tg/miniapp/in/roomtemplates'}><Button>roomtemplates</Button></NavLink>

                {/*</MobileLayout>*/}

            </div>
        </>
    )
}

export default Index