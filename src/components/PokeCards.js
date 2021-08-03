/* import React, { useState } from 'react' */
import uniqid from 'uniqid' 
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader'

const styles = {
  pokeCardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  pokeCard: {
    width: '163px',
    textAlign: 'center',
    position: 'relative',
    float: 'left'
  }
}

const PokeCard = (props) => {
  return (
    <Card
      style={styles.pokeCard}
    >
      <CardActionArea
        onClick={() => console.log(props.name)}
      >
        <CardHeader title={props.name}/>
        <img src={props.src} alt={props.name}></img>
      </CardActionArea>
    </Card>
  )
}

const PokeCards = (props) => {
  const currentPokemon = props.currentPokemon
  const pokeCardList = currentPokemon.map((p) => (
    <PokeCard 
      key={uniqid()}
      src={p.src}
      name={p.name}
    />
  ))
  
  return (
    <div
      style={styles.pokeCard}
    >
      {pokeCardList}
    </div>
  )
}

export default PokeCards