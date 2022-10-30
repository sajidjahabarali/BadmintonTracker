import CurrentMatch from "../CurrentMatch/CurrentMatch";
import PlayerTable from "../PlayerTable/PlayerTable";
import "./TrackerInfo.css";
function TrackerInfo(props) {
  return (
    <div>
      <div className="trackerInfoComponent">
        <CurrentMatch
          resetButtonPressed={props.resetButtonPressed}
        ></CurrentMatch>
      </div>
      <div className="trackerInfoComponent">
        <PlayerTable></PlayerTable>
      </div>
    </div>
  );
}

export default TrackerInfo;
