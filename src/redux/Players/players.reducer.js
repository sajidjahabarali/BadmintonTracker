import {
  RESET_PLAYER_DATA,
  ADD_PLAYER,
  ADD_WIN_TO_PLAYER,
  ADD_LOSS_TO_PLAYER,
  TOGGLE_PLAYER_FROZEN,
} from "./players.types";
import { shuffleArray } from "../../common.utils";

const INITIAL_STATE = {
  players: [],
  pairings: [],
};

const sortByMatches = (player1, player2) => {
  if (player1.matchMakingMatchesPlayed > player2.matchMakingMatchesPlayed)
    return 1;
  else if (player1.matchMakingMatchesPlayed < player2.matchMakingMatchesPlayed)
    return -1;
  else return 0;
};

const sortByFrozen = (player1, player2) => {
  if (player1.frozen && !player2.frozen) return 1;
  else if (!player1.frozen && player2.frozen) return -1;
  else return 0;
};

const sortPlayers = (players) => {
  const playersSortedByMatches = players.sort((player1, player2) =>
    sortByMatches(player1, player2)
  );
  const playersSortedByMatchesAndFrozen = playersSortedByMatches.sort(
    (player1, player2) => sortByFrozen(player1, player2)
  );

  return playersSortedByMatchesAndFrozen;
};

const equalMatchesForAllPlayers = (players) => {
  const comparisonPlayer = players[0];
  for (let player in players) {
    if (
      players[player].matchMakingMatchesPlayed !==
      comparisonPlayer.matchMakingMatchesPlayed
    ) {
      return false;
    }
  }
  return true;
};

// const updateRelativeStats = (playersCopy) => {
//   const newRelativeStats = playersCopy.map((player) => {
//     return playersCopy
//       .filter((relativePlayer) => relativePlayer.name !== player.name)
//       .reduce((previousResult, relativePlayer) => {
//         return { ...player, relativeStats: { teammates: [], opponents: [] } };
//       });
//   });

//   return { teammates: newRelativeStats, opponents: newRelativeStats };
// };

const updatePairings = () => {};

const reducer = (state = INITIAL_STATE, action) => {
  let playersCopy = [...state.players];
  let newPlayersState = [];
  switch (action.type) {
    case RESET_PLAYER_DATA:
      return { players: [] };

    case ADD_PLAYER:
      playersCopy.push({
        name: action.payload,
        wins: 0,
        losses: 0,
        actualMatchesPlayed: 0,
        matchMakingMatchesPlayed:
          playersCopy.length > 0 ? playersCopy[0].matchMakingMatchesPlayed : 0,
        frozen: false,
      });

      updatePairings(playersCopy);

      newPlayersState = sortPlayers(playersCopy);
      break;

    case TOGGLE_PLAYER_FROZEN:
      playersCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.frozen = !player.frozen;
          player.matchMakingMatchesPlayed =
            playersCopy[0].matchMakingMatchesPlayed;
        }
      });

      newPlayersState = sortPlayers(playersCopy);
      break;

    case ADD_WIN_TO_PLAYER:
      playersCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.wins++;
          player.actualMatchesPlayed++;
          player.matchMakingMatchesPlayed++;
        }
      });

      newPlayersState = equalMatchesForAllPlayers(playersCopy)
        ? shuffleArray(playersCopy).sort((a, b) => sortByFrozen(a, b))
        : sortPlayers(playersCopy);
      break;

    case ADD_LOSS_TO_PLAYER:
      playersCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.losses++;
          player.actualMatchesPlayed++;
          player.matchMakingMatchesPlayed++;
        }
      });

      newPlayersState = equalMatchesForAllPlayers(playersCopy)
        ? shuffleArray(playersCopy).sort((a, b) => sortByFrozen(a, b))
        : sortPlayers(playersCopy);
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
