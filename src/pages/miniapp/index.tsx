import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router";
import { Button } from "@/components/ui/button";

function Index() {
    const navigate = useNavigate();

    const sendInitData = async () => {
        const tg = window.Telegram?.WebApp;

        if (!tg) {
            alert('این اپلیکیشن باید در Telegram باز شود');
            navigate('/tg/miniapp/unauthorized');
            return;
        }

        try {
            const initData = tg.initData;
            if (!initData) {
                alert('initData دریافت نشد');
                navigate('/tg/miniapp/unauthorized');
                return;
            }

            const response = await fetch('/api/tg/miniapp/auth', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${initData}`
                }
            });

            if (response.ok) {
                // Authenticated
                // Optionally store tokens if needed
            } else {
                navigate('/tg/miniapp/unauthorized');
            }
        } catch (error) {
            navigate('/tg/miniapp/unauthorized');
        }
    };

    useEffect(() => {
        sendInitData();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <NavLink to={'/tg/miniapp/in/home'}><Button>Go Home</Button></NavLink>
            <hr />
            <Button onClick={sendInitData}>Auth</Button>
            <div className="card">
                <Button onClick={sendInitData}>Auth</Button>
            </div>
        </div>
    );
}

export default Index;
