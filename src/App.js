import { useEffect, useState } from 'react';
import PokeCards from './components/PokeCards'

function App() {
  const [currentPokemon, setCurrentPokemon] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [scores, setScores] = useState({
    current: 0,
    high: 0
  })
  
  function getRandomPokeIndex() {
    return Math.floor(Math.random() * (898 - 1) + 1);
  }

  async function getAllPokemon() {
    let pokemonArr = []
    let numOfRounds = 1;
    let numOfPokemonPerRound = [5, 10, 15, 20]
    setLoading(true)
    
    for (let i = 0; i < numOfRounds; i++) {
      let gameRoundArr = []
      for (let j = 0; j < numOfPokemonPerRound[i]; j++) {
        let newPokemon = {}
        let pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${getRandomPokeIndex()}/`, {mode: 'cors'})
        let pokeDataJSON = await pokeData.json()

        if (pokeDataJSON.name.indexOf('-') !== -1) {
          let index = pokeDataJSON.name.indexOf('-')
          newPokemon.name = pokeDataJSON.name.slice(0, index)
        } else {
          newPokemon.name = pokeDataJSON.name
        }
        newPokemon.src = pokeDataJSON.sprites.front_default
        newPokemon.hasBeenClicked = false

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

  function randomizePokemonOrder() {
    let currentPokemonCopy = [...currentPokemon]
    
    let roundLength = currentPokemonCopy.length
    
    
    for (let i = 0; i < roundLength; i++) {
      currentPokemonCopy[i].order = Math.random()
    }
       
    currentPokemonCopy.sort((a, b) => {
      return a.order - b.order
    })

    return currentPokemonCopy
  }

  function updateClickedState(name, currentPokemonCopy) {
    // store initial value, asking "was this pokemon already clicked?"
    let pokemonAlreadyClicked = currentPokemonCopy.find(p => p.name === name).hasBeenClicked
    
    // in any case, now it has been clicked, so update the obj to reflect that
    currentPokemonCopy.find(p => p.name === name).hasBeenClicked = true
    
    // set state with the new object values
    setCurrentPokemon(currentPokemonCopy)

    // return the initial value for use in updateScore()
    return pokemonAlreadyClicked
  }

  function updateScore(pokemonAlreadyClicked) {
    let current = scores.current
    let high = scores.high

    if (pokemonAlreadyClicked === false) {
      current ++
    } else {
      current = 0
    }

    if (current > high) {
      high = current
    }

    setScores({
      current: current,
      high: high
    })
  }

  function handleClickOnPokemon(name) {
    let currentPokemonCopy = randomizePokemonOrder()
    let pokemonAlreadyClicked = updateClickedState(name, currentPokemonCopy)
    updateScore(pokemonAlreadyClicked)
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
            scores={scores}
            handleClickOnPokemon={handleClickOnPokemon}
            
          />
      }
    </div>
  );
}

export default App;
