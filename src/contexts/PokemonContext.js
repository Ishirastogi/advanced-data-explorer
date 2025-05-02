import React, { createContext, useState, useEffect } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState('id-asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const perPage = 20;

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (pokemon) => {
    const isFavorite = favorites.some((fav) => fav.id === pokemon.id);
    const updated = isFavorite
      ? favorites.filter((fav) => fav.id !== pokemon.id)
      : [...favorites, pokemon];

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();

        const details = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return res.json();
          })
        );

        setAllPokemon(details);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let list = [...allPokemon];

    if (showFavoritesOnly) {
      list = list.filter((p) => favorites.some((f) => f.id === p.id));
    }

    if (selectedTypes.length > 0) {
      list = list.filter((p) =>
        (p.types || []).map((t) => t.type.name).includes(selectedTypes[0])
      );
    }

    switch (sortOption) {
      case 'id-asc':
        list.sort((a, b) => a.id - b.id);
        break;
      case 'id-desc':
        list.sort((a, b) => b.id - a.id);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredPokemon(list);
    setCurrentPage(1);
  }, [allPokemon, favorites, selectedTypes, showFavoritesOnly, sortOption]);

  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filteredPokemon.length / perPage);

  const handleTypeSelect = (type) => {
    if (selectedTypes[0] === type) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes([type]);
    }
    setCurrentPage(1);
  };

  return (
    <PokemonContext.Provider
      value={{
        allPokemon,
        filteredPokemon: paginatedPokemon,
        selectedTypes,
        setSelectedTypes: handleTypeSelect,
        sortOption,
        setSortOption,
        loading,
        error,
        currentPage,
        setCurrentPage,
        totalPages,
        favorites,
        toggleFavorite,
        showFavoritesOnly,
        setShowFavoritesOnly,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
