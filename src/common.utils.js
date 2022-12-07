import { createTheme } from "@mui/material/styles";
import { orange, blue, common, grey } from "@mui/material/colors";

const sortByTeammatePairings1 = (players, pairings) => {
  let playersCopy = createShallowCopy(players);
  const sortedPlayersCopy = [];

  while (playersCopy.length > 0) {
    const comparisonPlayer = playersCopy[0];
    sortedPlayersCopy.push(comparisonPlayer);
    playersCopy = playersCopy.slice(1);

    if (playersCopy.length > 0) {
      let lowestTeammateMatchesPlayed = Number.POSITIVE_INFINITY;
      let lowestTeammateMatchesPlayedPlayerKey = null;
      for (let playerKey in playersCopy) {
        for (let pairingsKey in pairings) {
          if (
            pairings[pairingsKey].players.includes(comparisonPlayer.name) &&
            pairings[pairingsKey].players.includes(playersCopy[playerKey].name)
          ) {
            if (
              pairings[pairingsKey].teammates.matchesPlayed <
              lowestTeammateMatchesPlayed
            ) {
              lowestTeammateMatchesPlayed =
                pairings[pairingsKey].teammates.matchesPlayed;
              lowestTeammateMatchesPlayedPlayerKey = playerKey;
            }
          }
        }
      }

      sortedPlayersCopy.push(playersCopy[lowestTeammateMatchesPlayedPlayerKey]);
      playersCopy.splice(lowestTeammateMatchesPlayedPlayerKey, 1);
    }
  }

  return sortedPlayersCopy;
};

const sortByTeammatePairings2 = (players, pairings) => {
  console.log("--------------------------");
  const playersCopy = createShallowCopy(players);
  const sortedPlayersCopy = [];

  while (playersCopy.length > 2) {
    // console.log(playersCopy.length);
    const pairingsWithUnsortedPlayers = getPairingsWithUnsortedPlayers(
      sortedPlayersCopy,
      pairings
    );

    const bestPairingsPerPlayer = getBestPairingsPerPlayer(
      playersCopy,
      pairingsWithUnsortedPlayers
    );

    const bestPairing = bestPairingsPerPlayer.reduce(
      (bestPairing, currentPairing) => {
        return currentPairing.teammates.matchesPlayed <
          bestPairing.teammates.matchesPlayed
          ? currentPairing
          : bestPairing;
      }
    );

    for (let playerKey = 0; playerKey < playersCopy.length; playerKey++) {
      if (bestPairing.players.includes(playersCopy[playerKey].name)) {
        sortedPlayersCopy.push(playersCopy[playerKey]);
        playersCopy.splice(playerKey, 1);
        playerKey = playerKey - 1;
      }
    }
  }

  if (playersCopy.length > 0) {
    sortedPlayersCopy.push(...playersCopy);
  }

  return sortedPlayersCopy;
};

export const sortByTeammatePairings = sortByTeammatePairings1;

const getPairingsWithUnsortedPlayers = (sortedPlayers, pairings) => {
  const pairingsWithUnsortedPlayers = pairings.filter((pairing) => {
    return sortedPlayers.reduce((prevVal, currentSortedPlayer) => {
      return prevVal && !pairing.players.includes(currentSortedPlayer.name);
    }, true);
  });

  return pairingsWithUnsortedPlayers;
};

const getBestPairingsPerPlayer = (players, pairings) => {
  let playersCopy = createShallowCopy(players);
  const bestPairingsPerPlayer = [];
  for (let playerKey in playersCopy) {
    let bestPairingForPlayer = null;
    let lowestPairingMatchesPlayedForPlayer = Number.POSITIVE_INFINITY;
    for (let pairingKey in pairings) {
      if (pairings[pairingKey].players.includes(playersCopy[playerKey].name)) {
        if (
          pairings[pairingKey].teammates.matchesPlayed <
          lowestPairingMatchesPlayedForPlayer
        ) {
          lowestPairingMatchesPlayedForPlayer =
            pairings[pairingKey].teammates.matchesPlayed;
          bestPairingForPlayer = pairings[pairingKey];
        }
      }
    }
    console.log(bestPairingForPlayer);
    bestPairingsPerPlayer.push(bestPairingForPlayer);
  }

  return bestPairingsPerPlayer;
};

export function saveToLocalStorage(state, name) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(name, serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export function loadFromLocalStorage(name) {
  try {
    const serialisedState = localStorage.getItem(name);
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

export const createShallowCopy = (object) => {
  return JSON.parse(JSON.stringify(object));
};

const appColors = {
  white: common.white,
  blue: blue[500],
  orange: orange[500],
  grey: grey[800],
};

export const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { type: "matchButton" },
          style: {
            color: appColors.white,
            fontSize: "25px",
          },
        },
      ],
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 12px",
        },
      },
    },
  },
  typography: {
    fontFamily: "Bebas Neue, Arial, Helvetica, sans-serif",
    fontSize: 18,
    h1: {
      fontSize: 40,
      color: appColors.grey,
    },
    currentMatchName1: {
      color: appColors.blue,
    },
    currentMatchName2: {
      color: appColors.orange,
    },
  },
  palette: {
    orange: {
      main: appColors.orange,
    },
    blue: {
      main: appColors.blue,
    },
    white: {
      main: appColors.white,
    },
    grey: {
      main: appColors.grey,
    },
  },
});
