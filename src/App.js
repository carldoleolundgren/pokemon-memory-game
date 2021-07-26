import { useEffect, useState } from 'react';
import PokeCards from './components/PokeCards'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [isLoading, setLoading] = useState(true)
  
  function getRandomPokeIndex() {
    return Math.floor(Math.random() * (898 - 1) + 1);
  }

  async function getPokemon(numOfPokemon) {
    let pokemonCopy = [...pokemon]
    setLoading(true)
    
    for (let i = 0; i < numOfPokemon; i++) { 
      let newPokemon = {}
      let randomPokeIndex = getRandomPokeIndex()
      const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${randomPokeIndex}/`, {mode: 'cors'})
      const pokeDataJson = await pokeData.json()
      
      newPokemon.name = pokeDataJson.name
      newPokemon.src = pokeDataJson.sprites.front_default
      
      pokemonCopy.push(newPokemon)
      
      console.log(pokemonCopy)
    }
    
    setPokemon(pokemonCopy)
    setLoading(false)
  }

  useEffect(() => {
    getPokemon(5)
    // eslint-disable-next-line 
  }, [])
  
  return (
    <div>
      {isLoading ? <div>Loading...</div> 
      : 
        <PokeCards
          pokemon={pokemon}
        />
    }
    </div>
  );
}

export default App;

//make each PokeCard a Material-UI card

