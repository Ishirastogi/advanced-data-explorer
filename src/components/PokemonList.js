import React, { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import PokemonCard from './PokemonCard';
import '../styles/Pagination.css';

const PokemonList = () => {
  const { filteredPokemon, loading, error, currentPage, setCurrentPage, totalPages, toggleFavorite, favorites } = useContext(PokemonContext);

  if (loading) return <p>Loading Pokémon...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.some((fav) => fav.id === pokemon.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>
    </>
  );
};

export default PokemonList;
