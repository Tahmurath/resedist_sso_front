//import { useState } from 'react'
import { useTranslation } from "react-i18next";
import {Button} from "@/components/ui/button.tsx";
import {axiosInstance} from "@/axios";
import {LoginForm} from "@/components/login-form.tsx";




function Home() {
    //const [count, setCount] = useState(0)

    const { t } = useTranslation();

    // const sendRequest = async () => {
    //    await axiosInstance.get(`/api/v1/department`);
    // }


    return (
        <>
            <div>
                <LoginForm/>
            </div>
        </>
    )
}

export default Home