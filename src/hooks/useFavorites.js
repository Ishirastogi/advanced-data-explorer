import { useState, useEffect } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    const exists = favorites.find(fav => fav.id === pokemon.id);
    if (exists) {
      setFavorites(favorites.filter(fav => fav.id !== pokemon.id));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };

  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;
