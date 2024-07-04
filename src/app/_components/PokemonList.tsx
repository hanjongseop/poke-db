"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Pokemon } from "../types/types";

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/pokemons");
      const data: Pokemon[] = await response.json();

      setPokemons(data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-current">
      <h1 className="text-3xl text-white font-bold mb-4 text-center p-5 ">
        포켓몬스터 도감
      </h1>
      <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link href={`/pokemons/${pokemon.id}`}>
              <div className="block relative">
                <p className="text-lg font-semibold text-gray-900 text-center ">
                  no. {pokemon.id}
                </p>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.korean_name}
                  className="w-full h-auto"
                />

                <p className="text-lg font-semibold text-gray-900 text-center">
                  {pokemon.korean_name}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
