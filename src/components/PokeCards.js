/* import React, { useState } from 'react' */
import uniqid from 'uniqid' 

const PokeCard = (props) => {
  return (
    <div>
      <img src={props.src} alt={props.name}></img>
      {props.name}
    </div>
  )
}

const PokeCards = (props) => {
  const pokemon = props.pokemon
  const pokeCardList = pokemon.map((p) => (
    <PokeCard 
      key={uniqid()}
      src={p.src}
      name={p.name}
    />
  ))
  
  return (
    <div>
      {pokeCardList}
    </div>
  )
}

export default PokeCards