// src/app/_components/PokemonList.tsx

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/pokemons");
      const data = await response.json();
      setPokemons(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>포켓몬스터 도감</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/pokemons/${pokemon.id}`}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>
                {pokemon.korean_name} {pokemon.id}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
