import "./App.css";
import { connect } from "react-redux";
import NameInput from "./Components/NameInput/NameInput";
import TrackerInfo from "./Components/TrackerInfo/TrackerInfo";
import { resetPlayerData } from "./redux/Players/players.actions";

function App(props) {
  const handleResetButton = () => {
    localStorage.clear();
    props.resetPlayerData();
    props.resetMatchesData();
  };

  return (
    <div className="App">
      <i
        onClick={() => handleResetButton()}
        className="reset-button fa-solid fa-arrow-rotate-left"
      ></i>
      <header className="App-header">Badminton Tracker</header>
      <div className="container">
        <NameInput></NameInput>
        <TrackerInfo></TrackerInfo>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPlayerData: (payload) => {
      dispatch(resetPlayerData(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
