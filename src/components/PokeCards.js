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
    marginRight: '5%', 
    clear: 'both'
  },
  pokeCard: {
    flex: '0 0 18%',
    float: 'left',
    textAlign: 'center',
    position: 'relative',
    marginBottom: '2%',
  },
  scoreCard: {
    flex: '0 0 22%',
    height: '163px'
  }
}

const PokeCard = (props) => {
  return (
    <Card
      style={styles.pokeCard}
    >
      <CardActionArea
        onClick={() => {
          props.handleClickOnPokemon(props.name)
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
      handleClickOnPokemon={props.handleClickOnPokemon}
      
    />
  ))
  
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        
      }}>
        <Card style={{...styles.pokeCard, ...styles.scoreCard, marginRight: '1%' }}>
          <CardHeader title={'Current Score'}/>
          {props.scores.current}
        </Card>
        <Card style={{...styles.pokeCard, ...styles.scoreCard, marginLeft: '1%'}}>
          <CardHeader title={'High Score'}/>
          {props.scores.high}
        </Card>
      </div>
      
      <div style={styles.pokeCardContainer}>
        {pokeCardList}
      </div>
    </div>
  )
}

export default PokeCards

// add a header
// add a counter - create a state variable to hold each current score and high score
// // calculate current score based on whether hasBeenClicked is true or not in a pokemon object
// // calculate high score based on whether currentScore state variable is higher than highScore