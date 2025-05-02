import { useState, useEffect } from 'react';

const usePokemonData = (limit = 150) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = await res.json();
      const details = await Promise.all(
        data.results.map(p => fetch(p.url).then(res => res.json()))
      );
      setPokemonList(details);
      setLoading(false);
    };
    fetchData();
  }, [limit]);

  return { pokemonList, loading };
};

export default usePokemonData;