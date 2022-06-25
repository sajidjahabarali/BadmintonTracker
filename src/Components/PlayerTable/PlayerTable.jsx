import { useEffect } from "react";
import { connect } from "react-redux";

function PlayerTable(props) {
  useEffect(() => {
    // console.log(props);
  });

  return (
    <div>
      {props.players.players.map((player, key) => {
        return (
          <div key={key}>
            {player.name} {player.games}
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    players: state.players,
  };
};

export default connect(mapStateToProps)(PlayerTable);
