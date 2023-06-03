import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import MyPokedex from './components/MyPokedex';
import logo from './pokemon-logo.png';
import './App.css';

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <img src={logo} alt="Pokemon Logo" className="logo" />
        <ul className="nav-links">
          <li>
            <Link to="/">Liste Pokémons</Link>
          </li>
          <li>
            <Link to="/pokedex">Mon  Pokédex</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokedex" element={<MyPokedex />} />
      </Routes>
    </Router>
  );
};

export default App;
