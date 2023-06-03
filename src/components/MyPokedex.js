import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MyPokedex = () => {
  const location = useLocation();
  const selectedPokemon = location.state?.pokemon;

  return (
    <div>
      <h1>Mon Pokédex</h1>
      <Link to="/">Liste des Pokémons</Link>
      {selectedPokemon ? (
        <div>
          <h3>{selectedPokemon.name}</h3>
          <p>Numéro : {selectedPokemon.number}</p>
        </div>
      ) : (
        <p>Aucun Pokémon sélectionné.</p>
      )}
    </div>
  );
};

export default MyPokedex;
