import { useState } from "react";

interface Gif {
  url: string;
}

function GifList() {
  const [pokemon, setPokemon] = useState("");
  const [gifs, setGifs] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/list-gifs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pokemon }),
      });

      const data = await response.json();

      setGifs(data.gifs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Pokemon:
          <input type="text" value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      {gifs.map((gif) => (
        <img key={gif} src={gif} alt="gif" />
      ))}
    </div>
  );
}

export default GifList;
