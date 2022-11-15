import {
  RESET_PLAYER_DATA,
  ADD_PLAYER,
  ADD_WIN_TO_PLAYER,
  ADD_LOSS_TO_PLAYER,
  TOGGLE_PLAYER_FROZEN,
} from "./players.types";
import { shuffleArray } from "../../common.utils";

const INITIAL_STATE = {
  playerDetails: [],
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

const updatePairings = (newPlayerName, existingPlayers, pairingsCopy) => {
  // console.log(newPlayerName, existingPlayers);
  for (let existingPlayerKey in existingPlayers) {
    pairingsCopy.push({
      players: [newPlayerName, existingPlayers[existingPlayerKey].name],
      teammates: {
        wins: 0,
        losses: 0,
        matchesPlayed: 0,
      },
      opponents: {
        wins: 0,
        losses: 0,
        matchesPlayed: 0,
      },
    });
  }

  return pairingsCopy;
};

const createStateSliceCopy = (slice) => {
  return slice.map((currentPlayerDetail) =>
    JSON.parse(JSON.stringify(currentPlayerDetail))
  );
};

const reducer = (state = INITIAL_STATE, action) => {
  let playerDetailsCopy = createStateSliceCopy(state.playerDetails);
  let pairingsCopy = createStateSliceCopy(state.pairings);
  let newPlayerDetailsState = [];
  let newPairingsState = [];
  switch (action.type) {
    case RESET_PLAYER_DATA:
      return { playerDetails: [], pairings: [] };

    case ADD_PLAYER:
      playerDetailsCopy.push({
        name: action.payload,
        wins: 0,
        losses: 0,
        actualMatchesPlayed: 0,
        matchMakingMatchesPlayed:
          playerDetailsCopy.length > 0
            ? playerDetailsCopy[0].matchMakingMatchesPlayed
            : 0,
        frozen: false,
      });

      newPairingsState = updatePairings(action.payload, state.players, [
        ...pairingsCopy,
      ]);

      newPlayerDetailsState = sortPlayers(playerDetailsCopy);
      break;

    case TOGGLE_PLAYER_FROZEN:
      playerDetailsCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.frozen = !player.frozen;
          player.matchMakingMatchesPlayed =
            playerDetailsCopy[0].matchMakingMatchesPlayed;
        }
      });

      newPlayerDetailsState = sortPlayers(playerDetailsCopy);
      break;

    case ADD_WIN_TO_PLAYER:
      playerDetailsCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.wins++;
          player.actualMatchesPlayed++;
          player.matchMakingMatchesPlayed++;
        }
      });

      newPlayerDetailsState = equalMatchesForAllPlayers(playerDetailsCopy)
        ? shuffleArray(playerDetailsCopy).sort((a, b) => sortByFrozen(a, b))
        : sortPlayers(playerDetailsCopy);
      break;

    case ADD_LOSS_TO_PLAYER:
      playerDetailsCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.losses++;
          player.actualMatchesPlayed++;
          player.matchMakingMatchesPlayed++;
        }
      });

      newPlayerDetailsState = equalMatchesForAllPlayers(playerDetailsCopy)
        ? shuffleArray(playerDetailsCopy).sort((a, b) => sortByFrozen(a, b))
        : sortPlayers(playerDetailsCopy);
      break;

    default:
      return state;
  }

  newPairingsState = newPairingsState ?? pairingsCopy;
  return {
    ...state,
    playerDetails: newPlayerDetailsState,
    pairings: newPairingsState,
  };
};

export default reducer;
