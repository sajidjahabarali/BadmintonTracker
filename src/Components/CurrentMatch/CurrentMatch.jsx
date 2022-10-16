import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect } from "react";
import {
  addGameToPlayer,
  addWinToPlayer,
  addLossToPlayer,
} from "../../redux/Players/players.actions";
import "./CurrentMatch.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    orange: {
      // Purple and green play nicely together.
      main: orange[500],
    },
    blue: {
      // This is green.A700 as hex.
      main: blue[500],
    },
  },
});

function CurrentMatch(props) {
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [bracketStarted, setBracketStarted] = useState(false);

  useEffect(() => {
    if (props.players.players.length >= 4) {
      const currentPlayersShuffled = shuffleArray(
        props.players.players.slice(0, 4)
      );
      setCurrentPlayers(currentPlayersShuffled);
    }
  }, [props.players.players]);

  const createNextMatch = (winningTeam) => {
    console.log(props.players.players);
    switch (winningTeam) {
      case "BLUE":
        props.addWinToPlayer(currentPlayers[0].name);
        props.addWinToPlayer(currentPlayers[1].name);
        props.addLossToPlayer(currentPlayers[2].name);
        props.addLossToPlayer(currentPlayers[3].name);
        currentPlayers.forEach((player) => props.addGameToPlayer(player.name));
        break;

      case "ORANGE":
        props.addWinToPlayer(currentPlayers[2].name);
        props.addWinToPlayer(currentPlayers[3].name);
        props.addLossToPlayer(currentPlayers[0].name);
        props.addLossToPlayer(currentPlayers[1].name);
        currentPlayers.forEach((player) => props.addGameToPlayer(player.name));
        break;

      default:
        break;
    }
    console.log(props.players.players);

    // currentPlayersShuffled.forEach((player) =>
    //   props.addGameToPlayer(player.name)
    // );
  };

  const shuffleArray = (array) => {
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

  const getMatch = () => {
    return (
      <div>
        <div className="blueTeam">
          {currentPlayers[0].name} and {currentPlayers[1].name}
        </div>
        <div className="team-divider">vs</div>
        <div className="orangeTeam">
          {currentPlayers[2].name} and {currentPlayers[3].name}
        </div>
      </div>
    );
  };
  return (
    <div>
      {bracketStarted ? getMatch() : null}
      {!(props.players.players.length >= 4) ? (
        <div>Add players &#40;minimum 4&#x29;</div>
      ) : bracketStarted ? (
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="blue"
            onClick={() => {
              createNextMatch("BLUE");
            }}
          >
            Blue wins
          </Button>
          <Button
            variant="contained"
            color="orange"
            onClick={() => {
              createNextMatch("ORANGE");
            }}
          >
            Orange wins
          </Button>
        </ThemeProvider>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            createNextMatch();
            setBracketStarted(true);
          }}
        >
          Create first match
        </Button>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    players: state.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addGameToPlayer: (payload) => {
      dispatch(addGameToPlayer(payload));
    },
    addWinToPlayer: (payload) => {
      dispatch(addWinToPlayer(payload));
    },
    addLossToPlayer: (payload) => {
      dispatch(addLossToPlayer(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMatch);
