import Head from "next/head";
import Image from "next/image";
import fs, { stat } from "node:fs/promises";
import Link from "next/link.js";
import { basename } from "path";
import { Layout } from "../components/Layout.js";
import { useI18n } from "../../context/i18n.js";

export default function Comic({
  id,
  title,
  width,
  height,
  img,
  alt,
  hasPrevious,
  hasNext,
  prevId,
  nextId,
}) {
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>{t("seo_default_title")}</title>
        <meta name="description" content={t("seo_default_title")} />
      </Head>

      <Layout>
        <section className="max-w-lg m-auto">
          <h1 className="font-bold text-center mb-4 text-xl">{title}</h1>
          <div className="max-w-sm m-auto mb-4">
            <Image
              layout="responsive"
              src={img}
              width={width}
              height={height}
              alt={alt}
            />
          </div>
          <p>{alt}</p>

          {/* create pagination with nextId and prevId if available */}
          <div className="flex justify-between font-semibold mt-4">
            {hasPrevious && (
              <Link href={`/comic/${prevId}`}>
                <a className="text-gray-500">⬅ Previous</a>
              </Link>
            )}
            {hasNext && (
              <Link href={`/comic/${nextId}`}>
                <a className="text-gray-500">Next ➡</a>
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths({ locales }) {
  const files = await fs.readdir("./comics");
  // array for return purposes
  let paths = [];

  // locales = ['en', 'es']
  locales.forEach((locale) => {
    paths = paths.concat(
      files.map((file) => {
        /*
					basename()
					- devuelve la ultima porcion de la ruta (el nombre del archivo)
					- si le pasamos un segundo parametro (extension), se lo quita a la ruta
				*/
        const id = basename(file, ".json");
        return { params: { id }, locale };
      })
    );
  });

  return {
    paths,
    fallback: false,
  };
}

/*
	getStaticProps()
	- cuando hacemos build nos genera el html estatico de cada pagina
*/
export async function getStaticProps({ params }) {
  const { id } = params;
  const FULFILLED = "fulfilled";

  // read file content
  const content = await fs.readFile(`./comics/${id}.json`, "utf8");
  const comic = JSON.parse(content);

  // navigation
  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  /*
		- read file sistem to check if the prev and next file exists
		- Promise.allSettled() -> devuelve un array de promesas, pero no importa si se resuelve o no, siempre devuelve un array. Estos van a ser objetos describiendo cada promesa
	*/
  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === FULFILLED;
  const hasNext = nextResult.status === FULFILLED;

  return {
    props: { ...comic, hasPrevious, hasNext, prevId, nextId },
  };
}
