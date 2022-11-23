import CurrentMatch from "../CurrentMatch/CurrentMatch";
import IndividualPlayerStatsTable from "../StatsTables/IndividualPlayerStatsTable/IndividualPlayerStatsTable";
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
        <IndividualPlayerStatsTable></IndividualPlayerStatsTable>
      </div>
    </div>
  );
}

export default TrackerInfo;
