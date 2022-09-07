import Head from "next/head";
import { useI18n } from "../../context/i18n";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>{t("seo_default_title")}</title>
        <meta name="description" content={t("seo_default_title")} />
      </Head>
      <Header />
      <main className="m-auto max-w-xl">{children}</main>
      <Footer />
    </>
  );
}
