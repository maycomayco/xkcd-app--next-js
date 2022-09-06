import Head from "next/head";
import { Layout } from "../components/Layout";
import { search } from "../../services/search";
import Link from "next/link";
import Image from "next/image";

export default function Search({ query, results }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h1>Searching for: {query}</h1>
        <div>
          {results.map((result) => (
            // <div key={comic.id}>
            //   <h2>{comic.title}</h2>
            //   <img src={comic.img} alt={comic.alt} />
            // </div>
            <Link href={`/comic/${result.id}`} key={result.id}>
              <a className="block p-4 border-b border-gray-200 flex bg-stone-100 hover:bg-red-100 ">
                <Image
                  src={result.img}
                  width={50}
                  height={50}
                  alt={result.alt}
                  className="rounded-full"
                />
                <div className="p-1">
                  <h2 className="font-semibold text-sm">{result.title}</h2>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = null } = query;

  // call microservice developed for algolia search api
  const { results } = await search({ query: q });

  // the return here is always that can be serializable, like a value, an object, an array, etc.
  return {
    props: {
      query: q,
      results,
    },
  };
}
