import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        setPokemonList(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const promises = pokemonList.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          const pokemonDetails = {
            name: response.data.name,
            number: response.data.id,
            types: response.data.types.map((type) => type.type.name),
            image: response.data.sprites.front_default
          };
          return pokemonDetails;
        });

        const pokemonDetailsList = await Promise.all(promises);
        setPokemonDetails(pokemonDetailsList);
      } catch (error) {
        console.log(error);
      }
    };

    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList]);

  const addToPokedex = (pokemon) => {
    // Implement the logic to add the selected Pokemon to the Pokedex
    // For now, we'll just log the selected Pokemon to the console
    console.log('Adding to Pokedex:', pokemon);
  };

  const navigateToPokedex = () => {
    navigate('/pokedex');
  };

  return (
    <div className="pokemon-list-container">
      <h1>Liste des Pokémons</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="pokemon-list">
          {pokemonDetails.map((pokemon) => (
            <li className="pokemon-card" key={pokemon.name}>
              <div className="pokemon-image-container">
                <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} />
              </div>
              <div className="pokemon-details">
                <h3>{pokemon.name}</h3>
                <p>Numéro : {pokemon.number}</p>
                {pokemon.types && <p>Types : {pokemon.types.join(', ')}</p>}
                <button className="add-to-pokedex-btn" onClick={() => addToPokedex(pokemon)}>
                  Ajouter au Pokédex
                </button>
                <Link
                  to={{
                    pathname: '/pokedex',
                    state: { pokemon }
                  }}
                >
                  Voir dans le Pokédex
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="navigate-to-pokedex-btn" onClick={navigateToPokedex}>
        Aller au Pokédex
      </button>
    </div>
  );
};

export default PokemonList;

