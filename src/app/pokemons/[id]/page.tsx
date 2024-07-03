import axios from "axios";
import Link from "next/link";

type Pokemon = {
  pokemon: {
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
};

export async function DetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await axios.get(`http://localhost:3000/api/pokemons/${id}`);
  const pokemon: Pokemon = res.data;
  console.log(pokemon);

  return (
    <>
      <div>
        <p>번혼:{pokemon.id}</p>
        <p>이름:{pokemon.korean_name}</p>
        <p>무게:{pokemon.weight}</p>
        <p>키{pokemon.height}</p>
      </div>
      <div>
        <h2>타입</h2>
        <ul>
          {pokemon.types.map((type, index) => (
            <li key={index}>{type.type.korean_name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>특성</h2>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.korean_name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>기술</h2>
        {pokemon.moves.map((move, index) => (
          <p key={index}>{move.move.korean_name}</p>
        ))}
      </div>
      <div>
        <Link href="/">뒤로가기</Link>
      </div>
    </>
  );
}

export default DetailPage;
