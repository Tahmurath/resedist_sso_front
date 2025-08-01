//import { useState } from 'react'
import { useTranslation } from "react-i18next";
import {Button} from "@/components/ui/button.tsx";
import {axiosInstance} from "@/axios";




function Home() {
    //const [count, setCount] = useState(0)

    const { t } = useTranslation();

    const sendRequest = async () => {
       await axiosInstance.get(`/api/v1/department`);
    }


    return (
        <>

            <div>
                <h3>Home page</h3>
                <div className="card">
                    <Button onClick={() => sendRequest()}>
                        Home is
                    </Button>

                    {t("login.description")}
                </div>

            </div>
        </>
    )
}

export default Home