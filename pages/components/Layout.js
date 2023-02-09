import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics para desarrolladores</title>
        <meta name="description" content="xkcd - Comics para desarrolladores" />
      </Head>
      <Header />
      <main className="mx-auto container pt-8 min-h-full">{children}</main>
      <Footer />
    </>
  );
}
