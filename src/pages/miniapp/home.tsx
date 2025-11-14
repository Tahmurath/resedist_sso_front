// import {NavLink} from "react-router";


import {NavLink} from "react-router";

function Index() {

    return (
        <>
            <div>
                {/*<MobileLayout>*/}
                Welcome Home
                <br/>
                <NavLink to={'/tg/miniapp/in/roomtemplates'}>roomtemplates</NavLink>

                {/*</MobileLayout>*/}

            </div>
        </>
    )
}

export default Index