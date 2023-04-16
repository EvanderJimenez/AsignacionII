import { useState, useLayoutEffect } from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";

interface PokemonData {
  url: string;
  type: string;
}
function GifList() {
  const [pokemon, setPokemon] = useState("");
  const [gifs, setGifs] = useState<string[]>([]);
  const [className, setClassName] = useState("pokebolaOpen");
  const [classNameD, setClassNameD] = useState("detalleOpen");
  const [error, setError] = useState(false);

  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  let vecType: string = "";


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/list-gifs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pokemon }),
    });

    if (pokemon === "" || response.status != 200) {
      setGifs([]);
      setError(true);
    } else {
      const data = await response.json();
      console.log(data);
      vecType = data.type;
      setGifs(data.gifs);
      setPokemonData(data);
      setError(false);
    }
  };

  useLayoutEffect(() => {
    if (pokemon.length > 0) {
      setClassName("pokebolaOpen");
      setClassNameD("detalleOpen");
    } else {
      setClassName("pokebola");
      setClassNameD("detalle");
    }
  }, [pokemon]);

  useLayoutEffect(() => {
    if (pokemonData && pokemonData.type) {
      const background =
        {
          normal: "bg-gray-400",
          fire: "bg-red-500",
          water: "bg-blue-500",
          electric: "bg-yellow-500",
          grass: "bg-green-500",
          ice: "bg-blue-200",
          fighting: "bg-red-700",
          poison: "bg-purple-500",
          ground: "bg-yellow-600",
          flying: "bg-indigo-500",
          psychic: "bg-pink-500",
          bug: "bg-green-400",
          rock: "bg-yellow-800",
          ghost: "bg-purple-700",
          dragon: "bg-red-900",
          dark: "bg-black",
          steel: "bg-gray-600",
          fairy: "bg-pink-200",
        }[pokemonData.type] || "bg-gray-400";
      document.body.classList.add(background);
      return () => {
        document.body.classList.remove(background);
      };
    }
  }, [pokemonData]);

  return (
    <div className="w-3/5 align-middle border-black border-8">
      <div className="flex-col flex-wrap justify-center searchDiv  gp10 bg-green-600  p-[3rem] ">
        <div className=" object-center">
          <div className={className}>
            <div className={classNameD}></div>
          </div>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex-col justify-center"
        >
          <h1 className="flex logo text-[25px] text-gradient-to-r from-red-500 via-orange-500  weight-100%">
            <strong>Find the Pokemon</strong>
          </h1>
          <div
            className="firstDiv flex justify-between items-center rounded-[8px]
                 gap-[10px]  p-5 shadow-greyIsh-700"
          ></div>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <div className="w-72">
              <div className="flex relative h-10 w-64 min-w-[200px]">
                <AiOutlineSearch className="text-[25px] icon" />
                <div className="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </div>
                <input
                  type="text"
                  id="pokemonName"
                  value={pokemon.toLowerCase()}
                  onChange={(e) => setPokemon(e.target.value)}
                  className="peer h-full w-full rounded-[7px] border border-red-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-brown-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-5 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-brown-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-brown-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-brown-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Pokémon name
                </label>
                <AiOutlineCloseCircle className="text-[30px] text-[#a5a6a6] hover:text-textColor icon" />
              </div>
            </div>
            <div></div>
            <button
              type="submit"
              className="bg-yellow-500 border-yellow-300 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-white-700 hover:border-red-500 rounded"
            >
              Search
            </button>
          </div>
        </form>
        {error && (
          <div className="flex justify-center items-center text-red-500 text-[20px] font-bold">
            Pokémon not found: Re-enter name
          </div>
        )}
      </div>
      <div className="pt-10 border-10 border-solid 1  justify-center bg-green-600  p-[3rem] ">
        <div className="grid grid-wrap grid-cols-1 gap-4 pt-10 pl-10 pr-10 min-w-[200px] w-full">
          {gifs.map((gif) => (
            <img className="rounded-[10px]" key={gif} src={gif} alt="gif" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GifList;
