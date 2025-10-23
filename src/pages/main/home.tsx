import {useTranslation} from "react-i18next";

function Home() {

    const { t } = useTranslation();

    return (
        <>
            <div>

                {/*<MobileLayout>*/}
                    <div>{t("login.welcome_back")}</div>
                {/*</MobileLayout>*/}

            </div>
        </>
    )
}

export default Home