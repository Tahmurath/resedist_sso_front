import {NavLink} from "react-router";


function Index() {

    return (
        <>
            <div>
                {/*<MobileLayout>*/}
                <NavLink to={"/tg/miniapp/in/home"}>Go Home</NavLink>

                {/*</MobileLayout>*/}

            </div>
        </>
    )
}

export default Index