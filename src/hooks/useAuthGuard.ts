import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useAuthGuard() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/v1/sso/auth/me', { credentials: 'include' })
            .then(res => {
                if (!res.ok) {
                    navigate('/tg/miniapp/');
                }
            })
            .catch(() => {
                navigate('/tg/miniapp/');
            });
    }, [navigate]);
}
