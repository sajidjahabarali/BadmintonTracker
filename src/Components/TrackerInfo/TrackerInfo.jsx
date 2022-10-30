import CurrentMatch from "../CurrentMatch/CurrentMatch";
import PlayerTable from "../PlayerTable/PlayerTable";
function BracketInfo(props) {
  return (
    <div>
      <CurrentMatch
        resetButtonPressed={props.resetButtonPressed}
      ></CurrentMatch>
      <PlayerTable></PlayerTable>
    </div>
  );
}

export default BracketInfo;
