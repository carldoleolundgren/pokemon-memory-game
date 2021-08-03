import { useEffect, useState } from 'react';
import PokeCards from './components/PokeCards'

function App() {
  const [currentPokemon, setCurrentPokemon] = useState([])
  const [isLoading, setLoading] = useState(true)
  
  function getRandomPokeIndex() {
    return Math.floor(Math.random() * (898 - 1) + 1);
  }

  
  async function getAllPokemon() {
    let pokemonArr = []
    let numOfRounds = 4;
    let numOfPokemonPerRound = [5, 10, 15, 20]
    setLoading(true)
    
    for (let i = 0; i < numOfRounds; i++) {
      let gameRoundArr = []
      for (let j = 0; j < numOfPokemonPerRound[i]; j++) {
        let newPokemon = {}
        let pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${getRandomPokeIndex()}/`, {mode: 'cors'})
        let pokeDataJSON = await pokeData.json()

        newPokemon.name = pokeDataJSON.name
        newPokemon.src = pokeDataJSON.sprites.front_default

        gameRoundArr.push(newPokemon)
      }
      pokemonArr.push(gameRoundArr)
    }
    
    localStorage.setItem('pokemonStorage', JSON.stringify(pokemonArr))
    getCurrentPokemon(0)
    setLoading(false)
  }
  
  function getCurrentPokemon(nthRound) {
    let currentPokemon = JSON.parse(localStorage.getItem('pokemonStorage'))
    setCurrentPokemon(currentPokemon[nthRound])
  }

  useEffect(() => {
    getAllPokemon() 

    // eslint-disable-next-line 
  }, [])
  
  return (
    <div>
      {isLoading 
        ? <div>Loading your randomized Pokédex...</div> 
        : <PokeCards
            currentPokemon={currentPokemon}
          />
      }
    </div>
  );
}

export default App;
