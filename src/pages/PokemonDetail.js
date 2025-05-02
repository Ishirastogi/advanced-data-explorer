import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Detail.css';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);
    };
    fetchDetail();
  }, [id]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="detail-container">
      <h2>{pokemon.name.toUpperCase()}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <p>Types: {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p>Stats:</p>
      <ul>
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
      <p>Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
      <p>Moves: {pokemon.moves.slice(0, 5).map(m => m.move.name).join(', ')}...</p>
    </div>
  );
};

export default PokemonDetail;
