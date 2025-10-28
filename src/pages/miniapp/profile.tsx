import {useTranslation} from "react-i18next";


function Index() {

    const { t } = useTranslation();

    return (
        <>
            <div>
                {/*<MobileLayout>*/}
                    <div>{t("site.Profile")}</div>
                {/*</MobileLayout>*/}

            </div>
        </>
    )
}

export default Index