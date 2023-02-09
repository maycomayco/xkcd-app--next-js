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
      <main className="m-auto max-w-xl">{children}</main>
      <Footer />
    </>
  );
}
