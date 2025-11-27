import {useTranslation} from "react-i18next";

function unauthorized() {

    const { t } = useTranslation();

    return (
        <>
            <div>

                {/*<MobileLayout>*/}
                    <div>tg/miniapp/unauthorized - {t("login.welcome_back")}</div>
                {/*</MobileLayout>*/}

            </div>
        </>
    )
}

export default unauthorized