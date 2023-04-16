import { rejects } from "assert";
import { url } from "inspector";
import React, { useState, useLayoutEffect, useRef } from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { SiPokemon } from "react-icons/si";

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
  const [className, setClassName] = useState("pokebolaOpen");
  const [classNameD, setClassNameD] = useState("detalleOpen");

  const [error, setError] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {

    e.preventDefault();

    const response = await fetch(`/api/pokemon?pokemon=${pokemonName}`);
    const data = await response.json();

    if (pokemonName === "" || data.gifUrls === null) {
      setGifUrls([])
      setPokemonData(null)
      setError(true);
    } else {
      setPokemonData(data);
      setGifUrls(data.gifUrls);
      setError(false);
    }

  };

  useLayoutEffect(() => {
    if (!pokemonData && pokemonName) {
      setClassName("pokebola");
      setClassNameD("detalle");
      console.log("wait");
    } else {
      setClassName("pokebolaOpen");
      setClassNameD("detalleOpen");
      console.log("auto");
    }
  }, [pokemonData, pokemonName]);

  useLayoutEffect(() => {
    if (pokemonData) {
      const type = pokemonData.type[0];
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
        }[type] || "bg-gray-400";
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
                  value={pokemonName.toLowerCase()}
                  onChange={(e) => setPokemonName(e.target.value)}
                  className="peer h-full w-full rounded-[7px] border border-red-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-brown-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-5 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-brown-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-brown-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-brown-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Pokemon Name
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
            Pokemon not found
          </div>
        )}
      </div>

      {pokemonData && (
        <div className="flex justify-center w-full">
          <div className="bg-green-600 w-full">
            <SiPokemon className=" text-[25vh]  text-[red] hover:text-textColor mx-auto" />
            <h2 className="text-[40px]  font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
              Name Pokemon :
            </h2>
            <h2 className=" text-[5vh]  font-semibold text-[lightgray] hover:text-white pt-40px gap-[40]">
              <strong>{pokemonData.name}</strong>
            </h2>
            <h2 className="text-[40px]  font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
              Weight :
            </h2>
            <p className="text-[5vh]  font-semibold text-[lightgray] hover:text-white">
              {" "}
              {pokemonData.weight}
            </p>
            <h2 className="text-[40px] font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
              Height :
            </h2>
            <p className="text-[5vh] font-semibold text-[lightgray] hover:text-white">
              {" "}
              {pokemonData.height}
            </p>
            <h2 className="text-[40px] font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
              Type :
            </h2>
            <p className="text-[5vh] font-semibold text-[lightgray] hover:text-white">
              {pokemonData.type}
            </p>
            <h2 className="text-[40px] font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
              Generation :
            </h2>
            <p className="text-[5vh] font-semibold text-[lightgray] hover:text-white">
              {" "}
              {pokemonData.generation}
            </p>
            <h2 className="text-[40px] font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
              Base Experience :{" "}
            </h2>
            <p className="text-[5vh] font-semibold text-[lightgray] hover:text-white">
              {pokemonData.baseExperience}
            </p>
          </div>
          <div className=" flex justify-center items-center border-black  bg-green-600 w-full">
            <div className="grid grid-wrap grid-cols-1 gap-4 pt-10 pl-10 pr-10 min-w-[200px] w-full">
              {gifUrls.map((url) => (
                <img
                  className="h-48 w-64 rounded-10px hover:scale-125 transition-transform opa "
                  key={url}
                  src={url}
                  alt="GIF"
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Pokemon;
