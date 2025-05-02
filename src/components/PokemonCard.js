import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/PokemonCard.css";
import useCompare from "../hooks/useCompare";
import { PokemonContext } from "../contexts/PokemonContext";

const PokemonCard = ({ pokemon, isFavorite }) => {
  const { toggleFavorite } = useContext(PokemonContext);
  const { compareList, addToCompare } = useCompare();

  const [isInCompareList, setIsInCompareList] = useState(false);

  useEffect(() => {
    const exists = compareList.some((poke) => poke.id === pokemon.id);
    setIsInCompareList(exists);
  }, [compareList, pokemon.id]);

  const types = pokemon.types.map((t) => t.type.name).join(", ");

  const handleAddToCompare = () => {
    addToCompare(pokemon);
    setIsInCompareList(true); // Update local state immediately
  };

  return (
    <div className="pokemon-card">
      <img
        className="pokemon-image"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <h3 className="pokemon-name">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} #{pokemon.id}
      </h3>
      <p className="pokemon-types">Type: {types}</p>

      {/* Favorite Button */}
      <button
        className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
        onClick={() => toggleFavorite(pokemon)}
      >
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>

      {/* Add to Compare Button */}
      <button
  className="compare-btn"
  onClick={handleAddToCompare}
  disabled={isInCompareList}
>
  {"Add to Compare"}
</button>

      {/* Detail Button */}
      <Link to={`/pokemon/${pokemon.id}`} className="detail-btn">
        <button>Details</button>
      </Link>
    </div>
  );
};

export default PokemonCard;
