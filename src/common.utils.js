import { createTheme } from "@mui/material/styles";
import { orange, blue, common, grey } from "@mui/material/colors";

export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// export const sortByTeammatePairings = (players, pairings) => {
//   let playersCopy = JSON.parse(JSON.stringify(players));
//   console.log(playersCopy);
//   const sortedPlayersCopy = [playersCopy[0]];
//   playersCopy = playersCopy.slice(1);
//   while (playersCopy.length > 0) {
//     let lowestTeammateMatchesPlayedSum = Number.POSITIVE_INFINITY;
//     let lowestTeammateMatchesPlayedPlayerKey = null;
//     let currentTeammateMatchesPlayedSum = 0;
//     for (let playerKey in playersCopy) {
//       //find reduced lowest matchesPlayed for each player compared to current some of lowest matches played between players
//       //add that players to the sorted array and remove from players copy.

//       for (let sortedPlayerKey in sortedPlayersCopy) {
//         for (let pairing in pairings) {
//           if (
//             pairings.includes(players[playerKey]) &&
//             pairing.includes(sortedPlayersCopy[sortedPlayerKey])
//           ) {
//             currentTeammateMatchesPlayedSum += pairing.teammates.matchesPlayed;
//           }
//         }
//       }

//       if (currentTeammateMatchesPlayedSum < lowestTeammateMatchesPlayedSum) {
//         console.log(
//           lowestTeammateMatchesPlayedSum,
//           currentTeammateMatchesPlayedSum,
//           playersCopy[playerKey]
//         );
//         lowestTeammateMatchesPlayedSum = currentTeammateMatchesPlayedSum;
//         lowestTeammateMatchesPlayedPlayerKey = playerKey;
//       }
//     }
//     console.log(lowestTeammateMatchesPlayedPlayerKey, playersCopy.length);
//     sortedPlayersCopy.push(playersCopy[lowestTeammateMatchesPlayedPlayerKey]);
//     playersCopy.splice(lowestTeammateMatchesPlayedPlayerKey, 1);
//   }

//   console.log(sortedPlayersCopy);
//   return sortedPlayersCopy;
// };

export const sortByTeammatePairings = (players, pairings) => {
  let playersCopy = JSON.parse(JSON.stringify(players));
  const sortedPlayersCopy = [];
  console.log(playersCopy);

  // const sortedPlayersCopy = [playersCopy[0]];
  // playersCopy = playersCopy.slice(1);

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
            // console.log("pairing found");
            // console.log(
            //   pairings[pairingsKey].teammates.matchesPlayed,
            //   lowestTeammateMatchesPlayed
            // );
            if (
              pairings[pairingsKey].teammates.matchesPlayed <
              lowestTeammateMatchesPlayed
            ) {
              // console.log("new lowestTeammateMatchesPlayedPlayer");
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

  console.log(sortedPlayersCopy);
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
