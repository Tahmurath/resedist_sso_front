import { useState } from 'react'
import { useTranslation } from "react-i18next";
import {Button} from "@/components/ui/button.tsx";
import {LoginForm} from "@/components/login-form.tsx";



function Home() {
    const [count, setCount] = useState(0)

    const { t } = useTranslation();


    return (
        <>

            <div>
                <LoginForm/>
            </div>
        </>
    )
}

export default Home