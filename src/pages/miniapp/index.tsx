import {NavLink} from "react-router";
import {Button} from "@headlessui/react";


function Index() {




    const sendInitData = ()=> {

        const tg = window.Telegram?.WebApp

        async function authenticate() {
            const initData = tg.initData;
            const response = await fetch('/api/tg/miniapp/auth', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${initData}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Authenticated:', data);
                // tg.showPopup({
                //     title: 'Authentication Successful',
                //     message: `Welcome, ${data.data.user.user.username}!`,
                //     buttons: [{ text: 'OK', type: 'default', id: 'ok' }]
                // });
                // ذخیره token یا ادامه اپ
            } else {
                alert('Authentication failed');
                //tg.showAlert('Authentication failed. Please try again.');
            }
        }
        authenticate();
    }

    return (
        <>
            <div>
                {/*<MobileLayout>*/}
                <NavLink to={"/tg/miniapp/in/home"}>Go Home</NavLink>
                <Button onClick={sendInitData}>Auth</Button>

                <div className="card">
                    <Button onClick={() => sendInitData()}>
                        Auth
                    </Button>

                </div>

                {/*</MobileLayout>*/}

            </div>
        </>
    )
}

export default Index