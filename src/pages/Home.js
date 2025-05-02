import React, { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';
import '../styles/Home.css';

const Home = () => {
  const {
    filteredPokemon,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages
  } = useContext(PokemonContext);

  if (loading) return <p>Loading Pokémon...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      <h1 className="page-title">Pokémon Explorer</h1>

      {/* FilterBar should internally update selectedType via context */}
      <FilterBar />

      <div className="pokemon-grid">
        {filteredPokemon && filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p>No Pokémon found.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
