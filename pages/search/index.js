import Head from "next/head";
import Layout from "../components/Layout";
import { search } from "../../services/search";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "../../context/i18n";

export default function Search({ query, results }) {
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>{t("seo_default_title")}</title>
        <meta name="description" content={`Search results for: ${query}`} />
      </Head>

      <Layout>
        <h1>{t("search_results_title", results.length, query)}</h1>
        <div>
          {results.map((result) => (
            <Link href={`/comic/${result.id}`} key={result.id}>
              <a className="p-4 border-b border-gray-200 bg-stone-100 hover:bg-red-100 flex">
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
