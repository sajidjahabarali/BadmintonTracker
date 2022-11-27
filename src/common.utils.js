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
