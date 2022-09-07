// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { I18NProvider, useI18n } from "../context/i18n";
import "../styles/globals.css";

const DefaultHeadApp = () => {
  const { t } = useI18n();
  return (
    <Head>
      <title>{t("seo_default_title")}</title>
      {/* we can put here all defaults value for the entire app */}
      <meta name="description" content={t("seo_default_title")} />
    </Head>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <I18NProvider>
        <DefaultHeadApp />
        <Component {...pageProps} />
      </I18NProvider>
    </NextUIProvider>
  );
}

export default MyApp;
