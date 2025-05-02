import React, { createContext, useState, useContext } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  // Add to the comparison list (max 2 Pokémon)
  const addToCompare = (pokemon) => {
    // Only add if there are less than 2 Pokémon and the Pokémon is not already in the list
    if (compareList.length < 2 && !compareList.find(p => p.id === pokemon.id)) {
      setCompareList(prevList => [...prevList, pokemon]);
    }
  };

  // Remove a Pokémon from the comparison list
  const removeFromCompare = (id) => {
    setCompareList(prevList => prevList.filter(p => p.id !== id));
  };

  // Clear the entire comparison list
  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
};
