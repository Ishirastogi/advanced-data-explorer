import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { useCompare } from '../contexts/CompareContext';

const Header = () => {
  const { compareList } = useCompare();
  const navigate = useNavigate();

  const handleRandom = () => {
    const id = Math.floor(Math.random() * 150) + 1;
    navigate(`/pokemon/${id}`);
  };

  return (
    <header className="header-container">
      <div className="header">
        <h1>Pokémon Explorer</h1>
        <nav className="top-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <button className="random-btn" onClick={handleRandom}>🎲 Random</button>
          <Link to="/compare" className="compare-btn">
            <span className="compare-text">Compare</span>
            <span className="compare-count">({compareList.length})</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
