import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useCompare } from '../contexts/CompareContext';

const Header = () => {
  const { compareList } = useCompare();

  return (
    <header className="header-container">
      <div className="header">
        <h1>Pokémon Explorer</h1>
      </div>
      <nav className="top-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
        <Link to="/compare" className="compare-btn">
          <span className="compare-text">Compare</span>
          <span className="compare-count">({compareList.length})</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
