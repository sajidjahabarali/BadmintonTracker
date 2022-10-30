import { createTheme } from "@mui/material/styles";
import { orange, blue, white } from "@mui/material/colors";

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

export const theme = createTheme({
  typography: {
    fontFamily: "Bebas Neue, Arial, Helvetica, sans-serif",
    fontSize: 18,
    h1: {
      fontSize: 40,
    },
  },
  palette: {
    orange: {
      main: orange[500],
    },
    blue: {
      main: blue[500],
    },
    white: {
      main: "white",
    },
  },
});

export const buttonTheme = {
  fontSize: "25px",
};
