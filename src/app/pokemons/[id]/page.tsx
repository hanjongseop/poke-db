import axios from "axios";
import Link from "next/link";
import { Pokemon } from "@/app/types/types";
import Image from "next/image";

export async function DetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await axios.get<Pokemon>(
    `http://localhost:3000/api/pokemons/${id}`
  );
  const pokemon = res.data;

  const weight = (weight: number): string => {
    return `${(weight / 10).toFixed(1)} kg`;
  };

  const Height = (height: number): string => {
    return `${(height / 10).toFixed(1)} m`;
  };

  return (
    <div className="h-full flex justify-center items-center  ">
      <section className="max-w-screen-sm bg-gray-100 rounded-xl">
        <div className="flex items-center mb-4">
          <p className="text-3xl font-bold mr-4">No. {pokemon.id}</p>
          <p className="text-3xl">{pokemon.korean_name}</p>
        </div>

        <div>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.korean_name}
            width={200}
            height={200}
          />
        </div>
        <br />
        <div className="flex items-center mb-4">
          <p className="text-3xl  mr-4">키: {Height(pokemon.height)}</p>
          <p className="text-3xl">무게: {weight(pokemon.weight)}</p>
        </div>

        <div className="flex items-center  mb-8">
          <ul className="flex flex-wrap gap-1 overflow-auto mt-2">
            <h2 className="text-xl font-bold mb-2">타입: </h2>
            {pokemon.types.map((type) => (
              <li key={type.type.korean_name} className="text-lg list-none ">
                {type.type.korean_name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <ul className="flex flex-wrap gap-1 overflow-auto mt-2">
            <h2 className="text-xl font-bold mb-2">특성: </h2>

            {pokemon.abilities.map((ability) => (
              <li
                key={ability.ability.korean_name}
                className="text-lg list-none"
              >
                {ability.ability.korean_name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">기술 </h2>
          <ul className="flex flex-wrap gap-1 overflow-auto mt-2 gap-1">
            {pokemon.moves.map((move) => (
              <li key={move.move.korean_name} className="text-lg list-none">
                {move.move.korean_name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-lg font-bold text-blue-500 hover:underline"
          >
            뒤로가기
          </Link>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
