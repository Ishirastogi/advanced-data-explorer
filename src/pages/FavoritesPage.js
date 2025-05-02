import React, { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import '../styles/FavoritesPage.css';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useContext(PokemonContext);

  return (
    <div className="favorites-page">
      <h1>Your Favorite Pokémon</h1>
      {/* "Back to Home" button */}
      <Link to="/" className="back-to-home-btn">
        Back to Home
      </Link>
      <div className="pokemon-list">
        {favorites.length === 0 ? (
          <p>No favorite Pokémon yet. Add some to your favorites!</p>
        ) : (
          favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              toggleFavorite={toggleFavorite} // Pass toggleFavorite to handle removing
              isFavorite={true} // Ensure it knows this is a favorite
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
