import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router for navigation
import "../styles/PokemonCard.css";
import useCompare from "../hooks/useCompare"; // Assuming this is a custom hook you created
import { PokemonContext } from "../contexts/PokemonContext"; // Make sure this context is correctly set up

const PokemonCard = ({ pokemon, isFavorite }) => {
  const { toggleFavorite, favorites } = useContext(PokemonContext);
  const { compareList, addToCompare } = useCompare();

  // Check if the current Pokemon is already in the compare list
  const isInCompareList = compareList.some((poke) => poke.id === pokemon.id);

  const types = pokemon.types.map((t) => t.type.name).join(", ");

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
        className={`compare-btn ${isInCompareList ? "added" : ""}`}
        onClick={() => addToCompare(pokemon)}
        disabled={isInCompareList}
      >
        {isInCompareList ? "Added to Compare" : "Add to Compare"}
      </button>

      {/* Detail Button */}
      <Link to={`/pokemon/${pokemon.id}`} className="detail-btn">
        <button>Details</button>
      </Link>
    </div>
  );
};

export default PokemonCard;
