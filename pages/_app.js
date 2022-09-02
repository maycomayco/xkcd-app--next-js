// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <Head>
        {/* we can put here all defaults value for the entire app */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
