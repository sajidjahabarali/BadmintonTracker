import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useEffect } from "react";
import {
  addWinToPlayer,
  addLossToPlayer,
  updateRelativeStatsForPlayers,
} from "../../redux/Players/players.actions";
import { buttonTheme, shuffleArray } from "../../common.utils";
import "./CurrentMatch.css";
import { ThemeProvider } from "@mui/material/styles";
import { saveToLocalStorage, loadFromLocalStorage } from "../../common.utils";
import { theme } from "../../common.utils";

const LOCAL_STORAGE_KEY = "currentMatchState";

function CurrentMatch(props) {
  const getCurrentPlayersDefaultState = () => {
    return loadFromLocalStorage(LOCAL_STORAGE_KEY)
      ? loadFromLocalStorage(LOCAL_STORAGE_KEY).currentPlayers
      : [];
  };

  const getMatchesStartedDefaultState = () => {
    return loadFromLocalStorage(LOCAL_STORAGE_KEY)
      ? loadFromLocalStorage(LOCAL_STORAGE_KEY).matchesStarted
      : false;
  };

  const getMatchesPlayedDefaultState = () => {
    return loadFromLocalStorage(LOCAL_STORAGE_KEY)
      ? loadFromLocalStorage(LOCAL_STORAGE_KEY).matchesPlayed
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
    if (props.playerDetails.length >= 4) {
      const currentPlayersShuffled = shuffleArray(
        props.playerDetails.slice(0, 4)
      );
      setCurrentPlayers(currentPlayersShuffled);
    }
  }, [props.playerDetails]);

  useEffect(() => {
    saveToLocalStorage(
      { currentPlayers, matchesStarted, matchesPlayed },
      LOCAL_STORAGE_KEY
    );
  }, [currentPlayers, matchesPlayed, matchesStarted]);

  const updatePlayerState = (player, teammate, opponents, wonGame) => {
    if (wonGame) {
      props.addWinToPlayer(player);
    } else {
      props.addLossToPlayer(player);
    }
    props.updateRelativeStatsForPlayers({
      player: player,
      teammate: teammate,
      opponents: opponents,
      wonGame: wonGame,
    });
  };

  const createNextMatch = (winningTeam) => {
    if (winningTeam) {
      setMatchesPlayed(matchesPlayed + 1);
    } else {
      return;
    }
    let winningTeamPlayers;
    let losingTeamPlayers;

    switch (winningTeam) {
      case "BLUE":
        props.addWinToPlayer(currentPlayers[0].name);
        props.addWinToPlayer(currentPlayers[1].name);
        props.addLossToPlayer(currentPlayers[2].name);
        props.addLossToPlayer(currentPlayers[3].name);
        winningTeamPlayers = [currentPlayers[0].name, currentPlayers[1].name];
        losingTeamPlayers = [currentPlayers[2].name, currentPlayers[3].name];
        break;

      case "ORANGE":
        props.addWinToPlayer(currentPlayers[2].name);
        props.addWinToPlayer(currentPlayers[3].name);
        props.addLossToPlayer(currentPlayers[0].name);
        props.addLossToPlayer(currentPlayers[1].name);
        winningTeamPlayers = [currentPlayers[2].name, currentPlayers[3].name];
        losingTeamPlayers = [currentPlayers[0].name, currentPlayers[1].name];
        break;

      default:
        break;
    }

    props.updateRelativeStatsForPlayers({
      winningTeamPlayers,
      losingTeamPlayers,
    });
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
        {!(props.playerDetails.length >= 4) ? null : matchesStarted ? (
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
    playerDetails: state.players.playerDetails ?? [],
    pairings: state.players.pairings ?? [],
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
    updateRelativeStatsForPlayers: (payload) => {
      dispatch(updateRelativeStatsForPlayers(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMatch);
