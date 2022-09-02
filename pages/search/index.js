import Head from "next/head";
import { Layout } from "../components/Layout";

export default function Search({ query }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h1>Searching for: {query}</h1>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = null } = query;

  // call algolia search api

  // the return here is always that can be serializable, like a value, an object, an array, etc.
  return {
    props: { query: q },
  };
}
