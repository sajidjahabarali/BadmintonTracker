import { addPlayer, addGameToPlayer } from "./players.actions";
const INITIAL_STATE = {
    players: []
}

const reducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case addPlayer:
      return {
        ...state,
        players: state.players.push({name: action.payload, games: 0})
      }
    case addGameToPlayer:
      return{
        ...state,
        players: state.players.forEach(player => {
          if(player.name === action.payload.name) {player.games=player.games++}
        })
      }
    default: return state;
  }
}

export default reducer;