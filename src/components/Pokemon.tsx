import { url } from "inspector";
import React, { useState , useLayoutEffect } from "react";
import {AiOutlineCloseCircle, AiOutlineSearch} from 'react-icons/ai'
import {SiPokemon} from 'react-icons/si'

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

  useLayoutEffect(()=>{
    
  })
  return (
    <div>
               
      <div className='searchDiv grid gp10 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-[10px] p-[3rem]'>
            <form action="" onSubmit={handleSubmit} className='flex'>
            <h1 className="flex logo text-[25px] text-gradient-to-r from-red-500 via-orange-500  weight-100%"><strong>Find the </strong>Pokemon
                </h1>
                <div className='firstDiv flex justify-between items-center rounded-[8px]
                 gap-[10px]  p-5 shadow-greyIsh-700'></div>

               <div className='flex ga´-2 items-center'>

              

                   <AiOutlineSearch className='text-[25px] icon'/>
                   <div className="w-72">
  <div className="relative h-10 w-full min-w-[200px]">
    <div className="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
      <i className="fas fa-heart" aria-hidden="true"></i>
    </div>
    <input type="text"  id="pokemonName"
                   value={pokemonName}
                   onChange={(e) => setPokemonName(e.target.value)} 
      className="peer h-full w-full rounded-[7px] border border-red-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-brown-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "
    />
    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-brown-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-brown-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-brown-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
    Pokemon Name
    </label>
  </div>
</div>
                   <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon' />
                   <button type="submit" className='class="bg-yellow-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-white-700 hover:border-red-500 rounded'>Search</button>
                </div>
            </form>
        </div>

      {pokemonData && (
        
        <div className="flex flex-col text-center " >
          <div className=" bg-gradient-to-b from-gray-500 via-blue-500 to-gray-500">
          <SiPokemon className='flex flex-col text-[300px] text-[red] hover:text-textColor object-center pl-100'/>
          
          <h2  className='text-[40px]  font-medium title-font text-sm text-gray-900 mb-1 tracking-wider'>Name Pokemon :</h2>
          <h2 className=' text-[60px] font-semibold text-[lightgray] hover:text-white pt-40px gap-[40]' ><strong>{pokemonData.name}</strong></h2>
          <h2  className='text-[40px]  font-medium title-font text-sm text-gray-900 mb-1 tracking-wider'>Weight :</h2>
        <p className='text-[60px] font-semibold text-[lightgray] hover:text-white' > {pokemonData.weight}</p>
        <h2  className='text-[40px] font-medium title-font text-sm text-gray-900 mb-1 tracking-wider'>Height :</h2>
        <p className='text-[60px] font-semibold text-[lightgray] hover:text-white' > {pokemonData.height}</p>
        <h2  className='text-[40px] font-medium title-font text-sm text-gray-900 mb-1 tracking-wider'>Type :</h2>
        <p className='text-[60px] font-semibold text-[lightgray] hover:text-white' >{pokemonData.type}</p>
        <h2  className='text-[40px] font-medium title-font text-sm text-gray-900 mb-1 tracking-wider'>Generation :</h2>
        <p className='text-[60px] font-semibold text-[lightgray] hover:text-white' > {pokemonData.generation}</p>
        <h2  className='text-[40px] font-medium title-font text-sm text-gray-900 mb-1 tracking-wider'>Base Experience : </h2>
        <p className='text-[60px] font-semibold text-[lightgray] hover:text-white' >{pokemonData.baseExperience}</p>
          </div>
        
       <div className="grid  grid-cols-3 gap-4 items-center border-solid border-2 border-indigo-600  ">
       {gifUrls.map((url) => (
          <img className="rounded-10px lg:w-4/5 md:w-1 object-cover object-center rounded-lg md:mt-0 mt-1" key={url} src={url} alt="GIF" />
        ))}
       </div >
       <div id="pokebola" >
  <div id="detalle"></div>
 </div>

      </div>
        
      )}
    </div>
  );
};

export default Pokemon;
