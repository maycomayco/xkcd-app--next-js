/*
	Search Microservice
	- This is a microservice that is used to search for comics using the Algolia API.
	-- Utilizando un microservicio es una de las mejores maneras ya que nos permite separar la lógica de negocio de la aplicación y nos permite reutilizarla en otros proyectos.
	-- Ademas aqui encapsulamos la logica para la utilizacion del servicio de busqueda de algolia y no realizamos peticiones directamente desde el servidor del cliente
*/
import algoliasearch from "algoliasearch/lite";

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.API_KEY;

const client = algoliasearch(APP_ID, API_KEY);
const index = client.initIndex("prod_comics");

// we define a dictionary for cache purpose
const CACHE = {};

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] };

  const queryOptions = {
    attributesToRetrieve: ["id", "title", "img", "alt"],
    hitsPerPage: 10,
  };
  const { hits } = await index.search(query, queryOptions);

  // update the cache dictionary
  CACHE[query] = hits;

  return { results: hits };
};
