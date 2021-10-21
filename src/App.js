import React, { useEffect } from "react";
import Table from './components/Table'
import PokemonJson from './pokemon.json/pokedex.json'

function App() {


  const PokemonColums = [
    'Sprite',
    'name' ,
    'HP',
    'Attack',
    'Defense',
    'Sp. Attack',
    'SP. Defense',
    'Speed',
    'Type',

  ]


  useEffect(() => {
    console.log(PokemonJson)
  }, [])

  return (
    <div >
      <Table dataTable={PokemonJson} colums={PokemonColums} />
    </div>
  );
}

export default App;
