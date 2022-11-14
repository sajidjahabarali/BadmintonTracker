import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect } from "react";
import {
  addWinToPlayer,
  addLossToPlayer,
} from "../../redux/Players/players.actions";
import { buttonTheme, shuffleArray } from "../../common.utils";
import "./CurrentMatch.css";
import { ThemeProvider } from "@mui/material/styles";
import { saveToLocalStorage, loadFromLocalStorage } from "../../common.utils";
import { theme } from "../../common.utils";

const localStorageKey = "currentMatchState";

function CurrentMatch(props) {
  const getCurrentPlayersDefaultState = () => {
    return loadFromLocalStorage(localStorageKey)
      ? loadFromLocalStorage(localStorageKey).currentPlayers
      : [];
  };

  const getMatchesStartedDefaultState = () => {
    return loadFromLocalStorage(localStorageKey)
      ? loadFromLocalStorage(localStorageKey).matchesStarted
      : false;
  };

  const getMatchesPlayedDefaultState = () => {
    return loadFromLocalStorage(localStorageKey)
      ? loadFromLocalStorage(localStorageKey).matchesPlayed
      : 0;
  };

  const [currentPlayers, setCurrentPlayers] = useState(
    getCurrentPlayersDefaultState()
  );
  const [matchesStarted, setMatchesStarted] = useState(
    getMatchesStartedDefaultState()
  );
  const [matchesPlayed, setMatchesPlayed] = useState(
    getMatchesPlayedDefaultState()
  );

  useEffect(() => {
    if (props.resetButtonPressed) {
      setCurrentPlayers([]);
      setMatchesPlayed(0);
      setMatchesStarted(false);
    }
  }, [props.resetButtonPressed]);

  useEffect(() => {
    if (props.players.players.length >= 4) {
      const currentPlayersShuffled = shuffleArray(
        props.players.players.slice(0, 4)
      );
      setCurrentPlayers(currentPlayersShuffled);
    }
  }, [props.players.players]);

  useEffect(() => {
    saveToLocalStorage(
      { currentPlayers, matchesStarted, matchesPlayed },
      localStorageKey
    );
  }, [currentPlayers, matchesPlayed, matchesStarted]);

  const createNextMatch = (winningTeam) => {
    setMatchesPlayed(matchesPlayed + 1);

    switch (winningTeam) {
      case "BLUE":
        props.addWinToPlayer(currentPlayers[0].name);
        props.addWinToPlayer(currentPlayers[1].name);
        props.addLossToPlayer(currentPlayers[2].name);
        props.addLossToPlayer(currentPlayers[3].name);
        break;

      case "ORANGE":
        props.addWinToPlayer(currentPlayers[2].name);
        props.addWinToPlayer(currentPlayers[3].name);
        props.addLossToPlayer(currentPlayers[0].name);
        props.addLossToPlayer(currentPlayers[1].name);

        break;

      default:
        break;
    }
  };

  const getMatch = () => {
    return (
      <div className="matchInfo">
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
      <ThemeProvider theme={theme}>
        {matchesStarted ? (
          <div className="matchCounter">
            Matches played: {matchesPlayed}
            {getMatch()}
          </div>
        ) : null}
        {!(props.players.players.length >= 4) ? null : matchesStarted ? (
          <div>
            <div className="button">
              <Button
                style={buttonTheme}
                className="teamButton"
                variant="contained"
                color="blue"
                onClick={() => {
                  createNextMatch("BLUE");
                }}
              >
                Blue wins
              </Button>
            </div>
            <div className="button">
              <Button
                style={buttonTheme}
                className="teamButton"
                variant="contained"
                color="orange"
                onClick={() => {
                  createNextMatch("ORANGE");
                }}
              >
                Orange wins
              </Button>
            </div>
          </div>
        ) : (
          <Button
            style={buttonTheme}
            variant="contained"
            color="white"
            onClick={() => {
              createNextMatch();
              setMatchesStarted(true);
            }}
          >
            Create first match
          </Button>
        )}
      </ThemeProvider>
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
    addWinToPlayer: (payload) => {
      dispatch(addWinToPlayer(payload));
    },
    addLossToPlayer: (payload) => {
      dispatch(addLossToPlayer(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMatch);
