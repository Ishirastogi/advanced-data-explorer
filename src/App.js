import { CompareProvider } from './contexts/CompareContext';
import { PokemonProvider } from './contexts/PokemonContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Compare from './pages/Compare';
import PokemonDetail from './pages/PokemonDetail';
import FavoritesPage from './pages/FavoritesPage';
import ErrorBoundary from './components/ErrorBoundary'; // Import the ErrorBoundary

function App() {
  return (
    <PokemonProvider>
      <CompareProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route
              path="/compare"
              element={
                <ErrorBoundary>
                  <Compare />
                </ErrorBoundary>
              }
            />
          </Routes>
        </Router>
      </CompareProvider>
    </PokemonProvider>
  );
}

export default App;
