// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import "../styles/globals.css";

const DefaultHeadApp = () => {
  return (
    <Head>
      <title>xkcd - Comics para desarrolladores</title>
      {/* we can put here all defaults value for the entire app */}
      <meta name="description" content="xkcd - Comics para desarrolladores" />
    </Head>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <DefaultHeadApp />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
