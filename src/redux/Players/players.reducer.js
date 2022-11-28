import {
  RESET_PLAYER_DATA,
  ADD_PLAYER,
  ADD_WIN_TO_PLAYER,
  ADD_LOSS_TO_PLAYER,
  TOGGLE_PLAYER_FROZEN,
  UPDATE_RELATIVE_STATS_FOR_PLAYERS,
} from "./players.types";
import { sortByTeammatePairings } from "../../common.utils";

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

const updatePairingsForNewPlayer = (
  newPlayerName,
  existingPlayers,
  pairingsCopy
) => {
  for (let existingPlayerKey in existingPlayers) {
    pairingsCopy.push({
      players: [newPlayerName, existingPlayers[existingPlayerKey].name],
      teammates: {
        wins: 0,
        losses: 0,
        matchesPlayed: 0,
        streak: 0,
      },
      opponents: {
        player1WinsAndPlayer2Losses: 0,
        player2WinsAndPlayer1Losses: 0,
        matchesPlayed: 0,
        player1WinStreakAndPlayer2LossStreak: 0,
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
        streak: 0,
        frozen: false,
      });

      newPairingsState = updatePairingsForNewPlayer(
        action.payload,
        state.playerDetails,
        [...pairingsCopy]
      );

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
          player.streak = player.streak > -1 ? player.streak + 1 : 1;
        }
      });

      newPlayerDetailsState = equalMatchesForAllPlayers(playerDetailsCopy)
        ? sortByTeammatePairings(playerDetailsCopy, pairingsCopy)
        : sortPlayers(playerDetailsCopy);
      break;

    case ADD_LOSS_TO_PLAYER:
      playerDetailsCopy.forEach((player) => {
        if (player.name === action.payload) {
          player.losses++;
          player.actualMatchesPlayed++;
          player.matchMakingMatchesPlayed++;
          player.streak = player.streak < 1 ? player.streak - 1 : -1;
        }
      });

      newPlayerDetailsState = equalMatchesForAllPlayers(playerDetailsCopy)
        ? sortByTeammatePairings(playerDetailsCopy, pairingsCopy)
        : sortPlayers(playerDetailsCopy);
      break;

    case UPDATE_RELATIVE_STATS_FOR_PLAYERS:
      const { winningTeamPlayers, losingTeamPlayers } = action.payload;
      newPairingsState = pairingsCopy.map((pairing) => {
        let newPairing = JSON.parse(JSON.stringify(pairing));
        newPairing = winningTeamPlayers.reduce(
          (previousValue, currentPlayer) => {
            return previousValue && newPairing.players.includes(currentPlayer);
          },
          true
        )
          ? {
              players: newPairing.players,
              teammates: {
                wins: newPairing.teammates.wins + 1,
                losses: newPairing.teammates.losses,
                matchesPlayed: newPairing.teammates.matchesPlayed + 1,
                streak:
                  newPairing.teammates.streak > -1
                    ? newPairing.teammates.streak + 1
                    : 1,
              },
              opponents: newPairing.opponents,
            }
          : newPairing;

        if (JSON.stringify(newPairing) !== JSON.stringify(pairing))
          return newPairing;

        newPairing = losingTeamPlayers.reduce(
          (previousValue, currentPlayer) => {
            return previousValue && newPairing.players.includes(currentPlayer);
          },
          true
        )
          ? {
              players: newPairing.players,
              teammates: {
                wins: newPairing.teammates.wins,
                losses: newPairing.teammates.losses + 1,
                matchesPlayed: newPairing.teammates.matchesPlayed + 1,
                streak:
                  newPairing.teammates.streak < 1
                    ? newPairing.teammates.streak - 1
                    : -1,
              },
              opponents: newPairing.opponents,
            }
          : newPairing;

        if (JSON.stringify(newPairing) !== JSON.stringify(pairing))
          return newPairing;

        newPairing = newPairing.players.reduce(
          (previousValue, currentPlayer) => {
            return (
              previousValue &&
              (winningTeamPlayers.includes(currentPlayer) ||
                losingTeamPlayers.includes(currentPlayer))
            );
          },
          true
        )
          ? winningTeamPlayers.includes(newPairing.players[0])
            ? {
                players: newPairing.players,
                teammates: newPairing.teammates,
                opponents: {
                  player1WinsAndPlayer2Losses:
                    newPairing.opponents.player1WinsAndPlayer2Losses + 1,
                  player2WinsAndPlayer1Losses:
                    newPairing.opponents.player2WinsAndPlayer1Losses,
                  matchesPlayed: newPairing.opponents.matchesPlayed + 1,
                  player1WinStreakAndPlayer2LossStreak:
                    newPairing.opponents.player1WinStreakAndPlayer2LossStreak >
                    -1
                      ? newPairing.opponents
                          .player1WinStreakAndPlayer2LossStreak + 1
                      : 1,
                },
              }
            : {
                players: newPairing.players,
                teammates: newPairing.teammates,
                opponents: {
                  player1WinsAndPlayer2Losses:
                    newPairing.opponents.player1WinsAndPlayer2Losses,
                  player2WinsAndPlayer1Losses:
                    newPairing.opponents.player2WinsAndPlayer1Losses + 1,
                  matchesPlayed: newPairing.opponents.matchesPlayed + 1,
                  player1WinStreakAndPlayer2LossStreak:
                    newPairing.opponents.player1WinStreakAndPlayer2LossStreak <
                    1
                      ? newPairing.opponents
                          .player1WinStreakAndPlayer2LossStreak - 1
                      : -1,
                },
              }
          : newPairing;

        return newPairing;
      });
      break;

    default:
      return state;
  }

  if (newPairingsState.length === 0) {
    newPairingsState = pairingsCopy;
  }
  if (newPlayerDetailsState.length === 0) {
    newPlayerDetailsState = playerDetailsCopy;
  }

  return {
    ...state,
    playerDetails: newPlayerDetailsState,
    pairings: newPairingsState,
  };
};

export default reducer;
