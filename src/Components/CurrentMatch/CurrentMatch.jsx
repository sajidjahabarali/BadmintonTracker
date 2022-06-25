import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { useState } from "react";
import { addGameToPlayer } from "../../redux/Players/players.actions";

function CurrentMatch(props) {
  const [showMatch, setShowMatch] = useState(false);
  const [currentPlayers, setCurrentPlayers] = useState([]);

  const createNextMatch = () => {
    const currentPlayersShuffled = shuffleArray(
      props.players.players.slice(0, 4)
    );
    setCurrentPlayers(currentPlayersShuffled);

    currentPlayersShuffled.forEach((player) =>
      props.addGameToPlayer(player.name)
    );
    if (!showMatch) {
      setShowMatch(true);
    }
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
        <div className="team1">
          {currentPlayers[0].name} and {currentPlayers[1].name}
        </div>
        <div className="team-divider">vs</div>
        <div className="team23">
          {currentPlayers[2].name} and {currentPlayers[3].name}
        </div>
      </div>
    );
  };
  return (
    <div>
      {showMatch ? getMatch() : null}
      {props.players.players.length >= 4 ? (
        <Button
          variant="contained"
          onClick={() => {
            createNextMatch();
          }}
        >
          Create next match
        </Button>
      ) : (
        <div>Add players &#40;minimum 4&#x29;</div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMatch);
