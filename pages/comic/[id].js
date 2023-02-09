import Head from "next/head";
import Image from "next/image";
import fs, { stat } from "node:fs/promises";
import Link from "next/link.js";
import Layout from "../components/Layout.js";

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
  return (
    <>
      <Head>
        <title>xkcd - Comics para desarrolladores</title>
        <meta name="description" content="xkcd - Comics para desarrolladores" />
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
