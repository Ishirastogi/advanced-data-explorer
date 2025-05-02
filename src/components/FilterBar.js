import React, { useEffect, useState, useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import '../styles/FilterBar.css';



const FilterBar = () => {
  const {
    selectedTypes,
    setSelectedTypes,
    sortOption,
    setSortOption,
    setCurrentPage,
  } = useContext(PokemonContext);

  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/type');
        const data = await res.json();
        const types = data.results
          .map((type) => type.name)
          .filter((name) => name !== 'unknown' && name !== 'shadow');
        setAllTypes(types);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  // ✅ Allow only one type to be selected at a time
  const handleTypeSelect = (type) => {
    if (selectedTypes[0] === type) {
      // If the same type is clicked again, deselect it
      setSelectedTypes([]);
    } else {
      setSelectedTypes([type]);
    }
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="filter-bar">
      <div className="sort-control">
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="id-asc">ID (Asc)</option>
          <option value="id-desc">ID (Desc)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>

      <div className="type-control">
        <label>Filter by Type:</label>
        <div className="type-list">
          {allTypes.map((type) => (
            <button
              key={type}
              className={`type-btn ${selectedTypes.includes(type) ? 'selected' : ''}`}
              onClick={() => handleTypeSelect(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
