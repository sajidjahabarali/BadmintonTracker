import CurrentMatch from "../CurrentMatch/CurrentMatch";
import PlayerTable from "../PlayerTable/PlayerTable";
function TrackerInfo(props) {
  return (
    <div>
      <CurrentMatch
        resetButtonPressed={props.resetButtonPressed}
      ></CurrentMatch>
      <PlayerTable></PlayerTable>
    </div>
  );
}

export default TrackerInfo;
