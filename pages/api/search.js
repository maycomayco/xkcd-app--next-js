// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { search } from "../../services/search";

export default async function handler(req, res) {
  const { query } = req;
  const { q = null } = query;

  // call microservice developed for algolia search api
  const { results } = await search({ query: q });

  return res.status(200).json({ results });
}
