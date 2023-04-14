import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTypes, setFilterTypes] = useState([]);
  const [filterWeaknesses, setFilterWeaknesses] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
      const data = await response.json();
      setPokemonList(data.pokemon);
    };
    fetchData();
  }, []);

  const handleSearch = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleTypeFilter = event => {
    const type = event.target.value;
    if (event.target.checked) {
      setFilterTypes([...filterTypes, type]);
    } else {
      setFilterTypes(filterTypes.filter(t => t !== type));
    }
  };

  const handleWeaknessFilter = event => {
    const weakness = event.target.value;
    if (event.target.checked) {
      setFilterWeaknesses([...filterWeaknesses, weakness]);
    } else {
      setFilterWeaknesses(filterWeaknesses.filter(w => w !== weakness));
    }
  };

  const filteredPokemon = pokemonList.filter(pokemon =>
    (pokemon.name.toLowerCase().includes(searchQuery) ||
     pokemon.num.includes(searchQuery)) &&
    (filterTypes.length === 0 || filterTypes.some(type => pokemon.type.includes(type))) &&
    (filterWeaknesses.length === 0 || filterWeaknesses.some(weakness => pokemon.weaknesses.includes(weakness)))
  );

  return (
    <div className="App">
      <h1>Pokemon Pokedex</h1>
      <div className="filters">
        <label>
          Search by name or number:
          <input type="text" value={searchQuery} onChange={handleSearch} />
        </label>
        <label>
          Filter by type:
          <select multiple value={filterTypes} onChange={handleTypeFilter}>
            {['Grass', 'Fire', 'Water', 'Bug', 'Normal', 'Poison', 'Electric', 'Ground', 'Fairy', 'Fighting', 'Psychic', 'Rock', 'Ghost', 'Ice', 'Dragon', 'Dark', 'Steel', 'Flying'].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Filter by weakness:
          <select multiple value={filterWeaknesses} onChange={handleWeaknessFilter}>
            {['Grass', 'Fire', 'Water', 'Bug', 'Normal', 'Poison', 'Electric', 'Ground', 'Fairy', 'Fighting', 'Psychic', 'Rock', 'Ghost', 'Ice', 'Dragon', 'Dark', 'Steel', 'Flying'].map(weakness => (
              <option key={weakness} value={weakness}>{weakness}</option>
            ))}
          </select>
        </label>
      </div>
      <ul className="pokemon-list">
        {filteredPokemon.map(pokemon => (
          <li key={pokemon.num}>
            <h2>{pokemon.name} ({pokemon.num})</h2>
            <p>Type: {pokemon.type.join(', ')}</p>
            <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;














