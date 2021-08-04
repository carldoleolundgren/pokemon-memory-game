/* import React, { useState } from 'react' */
import uniqid from 'uniqid' 
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader'

const styles = {
  pokeCardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginLeft: '5%',
    marginRight: '5%'
  },
  pokeCard: {
    flex: '0 0 18%',
    float: 'left',
    textAlign: 'center',
    position: 'relative',
    marginBottom: '2%',
    /* display: 'inline-block' */
  }
}

const PokeCard = (props) => {
  return (
    <Card
      style={styles.pokeCard}
    >
      <CardActionArea
        onClick={() => {
          console.log(props.name)
          props.randomizePokemonOrder()
        }}
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
      randomizePokemonOrder={props.randomizePokemonOrder}
    />
  ))
  
  return (
    <div style={styles.pokeCardContainer}>
      {pokeCardList}
    </div>
  )
}

export default PokeCards

// display cards on same line
// add a header
// add a counter
// randomize the order of the pokemon on each click