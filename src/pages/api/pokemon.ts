import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import { GiphyFetch } from "@giphy/js-fetch-api";

const giphyFetch = new GiphyFetch("z3c3q45cNAYqpVcu7BGbUWLsxAlJCGEk"); //instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pokemonName = req.query.pokemon as string;

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  const pokemonResponse = await fetch(pokemonUrl);
  const pokemonData = await pokemonResponse.json();

  const pokemonType = pokemonData.types.map((type: any) => type.type.name);

  const generationUrl =
    pokemonData.game_indices[pokemonData.game_indices.length - 1].version.url;
  const generationResponse = await fetch(generationUrl);
  const generationData = await generationResponse.json();
  const pokemonGeneration = generationData.name;

  const { data: gifs } = await giphyFetch.search(pokemonData.name + " fight", {
    limit: 5,
  });

  return res.status(200).json({
    name: pokemonData.name,
    weight: pokemonData.weight,
    height: pokemonData.height,
    type: pokemonType,
    generation: pokemonGeneration,
    baseExperience: pokemonData.baseExperience,
    gifUrls: gifs.map((gif) => gif.images.original.url), //urls
  });
}
