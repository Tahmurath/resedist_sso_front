import { useState } from 'react'
import { useTranslation } from "react-i18next";
import {Button} from "@/components/ui/button.tsx";
import {LoginForm} from "@/components/login-form.tsx";
import {cn} from "@/lib/utils.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {RegisterForm} from "@/components/register-form.tsx";



function Login() {
    //const [count, setCount] = useState(0)

    const { t } = useTranslation();


    return (
        <>
            <div>
                <LoginForm/>
            </div>
        </>
    )
}

export default Login