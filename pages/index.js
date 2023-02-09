// import Head from "next/head";
import Image from "next/image";
import fs from "fs/promises";
import Link from "next/link";
import Layout from "./components/Layout";

export default function Home({ latestComics }) {
  return (
    <>
      <Layout>
        <h2 className="text-3xl font-bold text-center mb-10">Latest Comics</h2>
        <section className="grid grid-cols-1 gap-2 m-auto sm:grid-cols-2 md:grid-cols-3 ">
          {latestComics.map((comic) => (
            <Link href={`/comic/${comic.id}`} key={comic.id}>
              <a className="mb-4 pb-4 m-auto">
                <h3 className="font-bold text-center pb-2">{comic.title}</h3>
                <Image
                  src={comic.img}
                  width={250}
                  height={250}
                  alt={comic.alt}
                  objectFit="contain"
                />
              </a>
            </Link>
          ))}
        </section>
      </Layout>
    </>
  );
}

/*
  getStaticProps()
  -- como el contenido de los json es estático, se puede generar en tiempo de compilación y obtendriamos el html estatico
*/
export async function getStaticProps() {
  // leemos los files de la carpeta
  const files = await fs.readdir("./comics");
  const latestFiles = files.slice(-12, files.length);
  console.log(latestFiles);
  const promisesReadFiles = latestFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`);
    return JSON.parse(content);
  });

  // esperamos a que se resuelvan todas las promesas con el contenido de cada archivo
  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: { latestComics },
  };
}
