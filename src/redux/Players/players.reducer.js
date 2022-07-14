import { ADD_PLAYER, ADD_GAME_TO_PLAYER } from "./players.types";
const INITIAL_STATE = {
    players: []
}

const sortByGames = (a, b) => {
  if (a.games > b.games) return 1
  else if (a.games < b.games) return -1
  else return 0
}

const reducer = (state=INITIAL_STATE, action) => {
  let playersCopy = [...state.players] 
  switch(action.type){
    case ADD_PLAYER:
      playersCopy.push({name: action.payload, games: playersCopy.length>0 ? playersCopy[playersCopy.length-1].games : 0})
      return {
        ...state,
        players: playersCopy.sort((a,b) => sortByGames(a,b))
      }
    case ADD_GAME_TO_PLAYER:
      playersCopy.forEach(player => {
        if(player.name === action.payload) {player.games++}
      })
      return{
        ...state,
        players: playersCopy.sort((a,b) => sortByGames(a,b))
      }
    default: return state;
  }
}

export default reducer;