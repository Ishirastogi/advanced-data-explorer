import React, { createContext, useEffect, useState, useMemo } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState('id-asc');
  const [favorites, setFavorites] = useState([]);
  const itemsPerPage = 20;

  const toggleFavorite = (pokemon) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === pokemon.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== pokemon.id));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setAllPokemon(pokemonDetails);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Pokémon:', err);
        setError('Failed to load Pokémon.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = useMemo(() => {
    let filtered = [...allPokemon];

    // Filter by selected type
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((t) => selectedTypes.includes(t.type.name))
      );
    }

    // Sorting logic
    if (sortOption === 'id-asc') {
      filtered.sort((a, b) => a.id - b.id);
    } else if (sortOption === 'id-desc') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortOption === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [allPokemon, selectedTypes, sortOption]);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPokemon.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPokemon, currentPage]);

  return (
    <PokemonContext.Provider
      value={{
        allPokemon,
        filteredPokemon: paginatedPokemon,
        loading,
        error,
        currentPage,
        setCurrentPage,
        totalPages,
        selectedTypes,
        setSelectedTypes,
        sortOption,
        setSortOption,
        favorites,
      toggleFavorite,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
