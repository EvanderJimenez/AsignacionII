import { url } from "inspector";
import React, { useState } from "react";

interface PokemonData {
  name: string;
  weight: number;
  height: number;
  type: string[];
  generation: string;
  baseExperience: number;
  gifUrls: string[];
}

const Pokemon = (): JSX.Element => {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [gifUrls, setGifUrls] = useState<string[]>([]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const response = await fetch(`/api/pokemon?pokemon=${pokemonName}`);
    const data = await response.json();
    setPokemonData(data);
    setGifUrls(data.gifUrls);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName">Pokemon name:</label>
        <input
          id="pokemonName"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <p>Weight: {pokemonData.weight}</p>
          <p>Height: {pokemonData.height}</p>
          <p>Type: {pokemonData.type}</p>
          <p>Generation: {pokemonData.generation}</p>
          <p>Base Experience: {pokemonData.baseExperience}</p>
          {gifUrls.map((url) => (
            <img key={url} src={url} alt="GIF" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokemon;
