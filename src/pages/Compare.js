import React, { useState } from 'react';
import '../styles/Compare.css';

const Compare = () => {
  const [poke1, setPoke1] = useState('');
  const [poke2, setPoke2] = useState('');
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data for both Pokémon
  const fetchData = async () => {
    setError(null);
    try {
      const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke1.toLowerCase()}`);
      const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke2.toLowerCase()}`);

      if (!res1.ok || !res2.ok) {
        throw new Error('One or both Pokémon not found!');
      }

      setData1(await res1.json());
      setData2(await res2.json());
    } catch (error) {
      setError('Error fetching data. Please check the Pokémon names and try again.');
    }
  };

  // Fetch random Pokémon
  const fetchRandomPokemon = async () => {
    setError(null);
    const randomId = Math.floor(Math.random() * 898) + 1; // PokeAPI has 898 Pokémon
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await res.json();
      setData1(data);
      setData2(null); // Reset second Pokémon when new random is selected
    } catch (error) {
      setError('Error fetching random Pokémon. Please try again.');
    }
  };

  return (
    <div className="compare-container">
      <h2>Compare Pokémon</h2>

      {/* Input fields for Pokémon names */}
      <div className="inputs">
        <input
          value={poke1}
          onChange={(e) => setPoke1(e.target.value)}
          placeholder="First Pokémon"
        />
        <input
          value={poke2}
          onChange={(e) => setPoke2(e.target.value)}
          placeholder="Second Pokémon"
        />
        <button onClick={fetchData}>Compare</button>
      </div>

      {/* Random Pokémon button */}
      <button className="random-btn" onClick={fetchRandomPokemon}>
        Random Pokémon
      </button>

      {/* Display error message if there's an error */}
      {error && <p className="error-message">{error}</p>}

      {/* Display comparison results */}
      <div className="compare-grid">
        {[data1, data2].map((poke, index) =>
          poke ? (
            <div key={index} className="poke-card">
              <h3>{poke.name}</h3>
              <img src={poke.sprites.front_default} alt={poke.name} />
              <ul>
                {poke.stats.map((s) => (
                  <li key={s.stat.name}>
                    <strong>{s.stat.name}:</strong> {s.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Compare;
