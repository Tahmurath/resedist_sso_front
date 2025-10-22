
// import {LoginForm} from "@/components/login-form.tsx";
// import MobileLayout from "@/layout/mobile.tsx"
// import BottomNavigation from '@/components/BottomNavigation.tsx';


// import BottomNavigation from "@/components/BottomNavigation.tsx";

import {LoginForm} from "@/components/login-form.tsx";

function Home() {
    //const [count, setCount] = useState(0)



    // const sendRequest = async () => {
    //    await axiosInstance.get(`/api/v1/department`);
    // }


    return (
        <>
            <div>
                <LoginForm/>
                {/*<MobileLayout>*/}
                    <div>محتوای صفحه خانه</div>
                {/*</MobileLayout>*/}

            </div>
        </>
    )
}

export default Home