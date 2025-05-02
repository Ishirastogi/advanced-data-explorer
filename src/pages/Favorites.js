import React, { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import '../styles/Favorites.css'; // Add your styling for the Favorites page

const Favorites = () => {
  const { favorites } = useContext(PokemonContext);

  if (favorites.length === 0) {
    return <p>No favorite Pokémon yet. Start adding some!</p>;
  }

  return (
    <div className="favorites-container">
      <h2>Your Favorite Pokémon</h2>
      <div className="pokemon-grid">
        {favorites.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
