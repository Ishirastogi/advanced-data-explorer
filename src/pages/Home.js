import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleRandom = () => {
    const id = Math.floor(Math.random() * 150) + 1;
    navigate(`/pokemon/${id}`);
  };

  if (loading) return <p>Loading Pokémon...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      <div className="top-nav">
        <Link to="/" className="nav-link">🏠 Home</Link>
        <Link to="/favorites" className="nav-link">❤️ Favorites</Link>
        <button className="random-btn" onClick={handleRandom}>🎲 Random</button>
      </div>

      <h1 className="page-title">Pokémon Explorer</h1>
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
