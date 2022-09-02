import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Card, Row, Text } from "@nextui-org/react";
import { Header } from "./components/Header";
import fs from "fs/promises";
import Link from "next/link";
import Footer from "./components/Footer";

export default function Home({ latestComics }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <h2 className="text-3xl font-bold text-center mb-10">Latest comics</h2>
        <section className="grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3">
          {latestComics.map((comic) => (
            <Link href={`/comic/${comic.id}`} key={comic.id}>
              <a className="mb-4 pb-4 m-auto">
                <h3 className="font-bold text-center pb-2">{comic.title}</h3>
                <Image
                  width={comic.width}
                  height={comic.height}
                  // objectFit="contain"
                  src={comic.img}
                  alt={comic.alt}
                />
              </a>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
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
  const latestFiles = files.slice(-8, files.length);
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
