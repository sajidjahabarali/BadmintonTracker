import { ADD_PLAYER, ADD_GAME_TO_PLAYER } from "./players.types";
const INITIAL_STATE = {
    players: []
}

const reducer = (state=INITIAL_STATE, action) => {
  let playersCopy = [...state.players] 
  switch(action.type){
    case ADD_PLAYER:
      playersCopy.push({name: action.payload, games: 0})
      return {
        ...state,
        players: playersCopy
      }
    case ADD_GAME_TO_PLAYER:
      playersCopy.forEach(player => {
        if(player.name === action.payload.name) {player.games=player.games++}
      })
      return{
        ...state,
        players: playersCopy
      }
    default: return state;
  }
}

export default reducer;