import {
  RESET_DATA,
  ADD_PLAYER,
  ADD_GAME_TO_PLAYER,
  ADD_WIN_TO_PLAYER,
  ADD_LOSS_TO_PLAYER,
  TOGGLE_PLAYER_FROZEN,
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

const sortByFrozen = (a, b) => {
  if (a.frozen && !b.frozen) return 1;
  else if (!a.frozen && b.frozen) return -1;
  else return 0;
};

const sortPlayers = (players) => {
  const playersSortedByGames = players.sort((a, b) => sortByGames(a, b));
  const playersSortedByGamesAndFrozen = playersSortedByGames.sort((a, b) =>
    sortByFrozen(a, b)
  );

  return playersSortedByGamesAndFrozen;
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
  let newPlayersState = [];
  switch (action.type) {
    case RESET_DATA:
      localStorage.clear();
      return { players: [] };

    case ADD_PLAYER:
      playersCopy.push({
        name: action.payload,
        wins: 0,
        losses: 0,
        actualGamesPlayed: 0,
        matchMakingGamesPlayed:
          playersCopy.length > 0 ? playersCopy[0].matchMakingGamesPlayed : 0,
        frozen: false,
        relativeStats: [],
      });

      newPlayersState = sortPlayers(playersCopy);
      break;

    case TOGGLE_PLAYER_FROZEN:
      playersCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.frozen = !player.frozen;
          player.matchMakingGamesPlayed = playersCopy[0].matchMakingGamesPlayed;
        }
      });

      newPlayersState = sortPlayers(playersCopy);
      break;

    case ADD_GAME_TO_PLAYER:
      playersCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.actualGamesPlayed++;
          player.matchMakingGamesPlayed++;
        }
      });

      newPlayersState = equalGamesForAllPlayers(playersCopy)
        ? shuffleArray(playersCopy).sort((a, b) => sortByFrozen(a, b))
        : sortPlayers(playersCopy);
      break;

    case ADD_WIN_TO_PLAYER:
      playersCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.wins++;
        }
      });

      newPlayersState = sortPlayers(playersCopy);
      break;

    case ADD_LOSS_TO_PLAYER:
      playersCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.losses++;
        }
      });

      newPlayersState = sortPlayers(playersCopy);
      break;

    default:
      return state;
  }

  return {
    ...state,
    players: newPlayersState,
  };
};

export default reducer;
