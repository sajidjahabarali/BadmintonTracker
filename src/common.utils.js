import { createTheme } from "@mui/material/styles";
import { orange, blue, common, grey } from "@mui/material/colors";

export const sortByTeammatePairings = (players, pairings) => {
  let playersCopy = JSON.parse(JSON.stringify(players));
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
