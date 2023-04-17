import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTypes, setFilterTypes] = useState("");
  const [filterWeaknesses, setFilterWeaknesses] = useState("");
  let weakArr = [
    "Grass",
    "Fire",
    "Water",
    "Bug",
    "Normal",
    "Poison",
    "Electric",
    "Ground",
    "Fairy",
    "Fighting",
    "Psychic",
    "Rock",
    "Ghost",
    "Ice",
    "Dragon",
    "Dark",
    "Steel",
    "Flying",
  ];
  let typesArr = [
    "Grass",
    "Fire",
    "Water",
    "Bug",
    "Normal",
    "Poison",
    "Electric",
    "Ground",
    "Fairy",
    "Fighting",
    "Psychic",
    "Rock",
    "Ghost",
    "Ice",
    "Dragon",
    "Dark",
    "Steel",
    "Flying",
  ];
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
      );
      const data = await response.json();
      console.log(data);
      setPokemonList(data.pokemon);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleTypeFilter = (event) => {
    let type = event.target.value;

    setFilterTypes(type);
    console.log(filterTypes);
  };

  const handleWeaknessFilter = (event) => {
    let weakness = event.target.value;
    setFilterWeaknesses(weakness);
    console.log(filterWeaknesses);
  };

  let test = (searchQuery, filterTypes, filterWeaknesses) => {
    console.log(searchQuery, filterTypes, filterWeaknesses);
    if (searchQuery && filterTypes && filterWeaknesses) {
      let value = pokemonList.filter((pokemon) => {
        return pokemon.name.includes(searchQuery) || pokemon.num.includes(searchQuery) && pokemon.type.includes(filterTypes) && pokemon.weaknesses.includes(filterWeaknesses)
      });
      return value;
    }
    else if (filterTypes && filterWeaknesses) {
      let value = pokemonList.filter((pokemon) => {
        return pokemon.type.includes(filterTypes) && pokemon.weaknesses.includes(filterWeaknesses)
      });
      return value;
    }
    else if (filterTypes || filterWeaknesses) {
      let value = pokemonList.filter((pokemon) => {
        return pokemon.type.includes(filterTypes) || pokemon.weaknesses.includes(filterWeaknesses)
      });
      return value;
    } else if (searchQuery) {
      let value = pokemonList.filter((pokemon) => {
        return pokemon.name.toLowerCase().startsWith(searchQuery) || pokemon.num.startsWith(searchQuery)
      });
      return value;
    }else {
      return pokemonList;
    }
  };
  let filteredPokemon = test(searchQuery, filterTypes, filterWeaknesses);
  console.log(filteredPokemon);

  // (pokemon.name.toLowerCase().includes(searchQuery) ||
  //  pokemon.num.includes(searchQuery)) &&
  // ((pokemon.some(creature => creature.type.includes(filterTypes)))) &&
  // ((pokemon.some(creature => creature.weaknesses.includes(filterWeaknesses))))

  return (
    <div className="App">
      <h1>Pokemon Pokedex</h1>
      <div className="filters">
        <label>
          Search by name or number:
          <input
            type="text"
            placeholder="Number or Letter"
            value={searchQuery}
            onChange={handleSearch}
          />
        </label>
        <label>
          Filter by type:
          <select value={filterTypes} onChange={handleTypeFilter}>
            <option value="" key="All">
              All
            </option>
            {typesArr.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filter by weakness:
          <select value={filterWeaknesses} onChange={handleWeaknessFilter}>
            <option value="" key="All">
              All
            </option>
            {weakArr.map((weakness) => (
              <option key={weakness} value={weakness}>
                {weakness}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ul className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <li key={pokemon.num}>
            <h2>
              {pokemon.name} ({pokemon.num})
            </h2>
            <img src={pokemon.img} alt={pokemon.num} />
            <p>Type: {pokemon.type.join(", ")}</p>
            <p>Weaknesses: {pokemon.weaknesses.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
