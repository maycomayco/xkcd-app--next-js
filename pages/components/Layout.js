import Head from "next/head";
import Footer from "./Footer";
import { Header } from "./Header";

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>
      <Header />
      <main className="m-auto max-w-xl">{children}</main>
      <Footer />
    </>
  );
}
