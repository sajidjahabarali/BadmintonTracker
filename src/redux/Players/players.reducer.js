import {
  ADD_PLAYER,
  ADD_GAME_TO_PLAYER,
  ADD_WIN_TO_PLAYER,
  ADD_LOSS_TO_PLAYER,
} from "./players.types";
import { shuffleArray } from "../../common.utils";
const INITIAL_STATE = {
  players: [],
};

const sortByGames = (a, b) => {
  if (a.matchMakingGamesPlayed > b.matchMakingGamesPlayed) return 1;
  else if (a.matchMakingGamesPlayed < b.matchMakingGamesPlayed) return -1;
  else return 0;
};

const equalGamesForAllPlayers = (players) => {
  const comparisonPlayer = players[0];
  for (let player in players) {
    if (
      players[player].matchMakingGamesPlayed !==
      comparisonPlayer.matchMakingGamesPlayed
    ) {
      return false;
    }
  }
  return true;
};

const reducer = (state = INITIAL_STATE, action) => {
  let playersCopy = [...state.players];
  switch (action.type) {
    case ADD_PLAYER:
      playersCopy.push({
        name: action.payload,
        wins: 0,
        losses: 0,
        actualGamesPlayed: 0,
        matchMakingGamesPlayed:
          playersCopy.length > 0 ? playersCopy[0].matchMakingGamesPlayed : 0,
      });
      return {
        ...state,
        players: playersCopy.sort((a, b) => sortByGames(a, b)),
      };
    case ADD_GAME_TO_PLAYER:
      playersCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.actualGamesPlayed++;
          player.matchMakingGamesPlayed++;
        }
      });

      const newPlayersState = equalGamesForAllPlayers(playersCopy)
        ? shuffleArray(playersCopy)
        : playersCopy.sort((a, b) => sortByGames(a, b));

      return {
        ...state,
        players: newPlayersState,
      };

    case ADD_WIN_TO_PLAYER:
      playersCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.wins++;
        }
      });
      return {
        ...state,
        players: playersCopy.sort((a, b) => sortByGames(a, b)),
      };

    case ADD_LOSS_TO_PLAYER:
      playersCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.losses++;
        }
      });
      return {
        ...state,
        players: playersCopy.sort((a, b) => sortByGames(a, b)),
      };

    default:
      return state;
  }
};

export default reducer;
