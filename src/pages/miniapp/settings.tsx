import {ModeToggle} from "@/components/mode-toggle.tsx";
import UserMenu from "@/components/UserMenu.tsx";
// import {GalleryVerticalEnd} from "lucide-react";


function Index() {

    return (
        <>
            <div>
                {/*<MobileLayout>*/}
                <div>Settings</div>


                <div>
                    <label htmlFor="theme-toggle">Theme Selection</label>
                    <ModeToggle />
                </div>
                <div>
                    <label htmlFor="language-menu">Language Selection</label>
                    <UserMenu  />
                </div>
                {/*</MobileLayout>*/}

            </div>
        </>
    )
}

export default Index