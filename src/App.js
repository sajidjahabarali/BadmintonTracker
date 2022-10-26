import "./App.css";
import { connect } from "react-redux";
import NameInput from "./Components/NameInput/NameInput";
import BracketInfo from "./Components/BracketInfo/BracketInfo";
import { resetData } from "./redux/Players/players.actions";

function App(props) {
  const handleResetButton = () => {
    console.log("test");
    props.resetData();
  };

  return (
    <div className="App">
      <i
        onClick={() => handleResetButton()}
        className="reset-button fa-solid fa-arrow-rotate-left"
      ></i>
      <header className="App-header">Badminton Bracket</header>
      <div className="container">
        <NameInput></NameInput>
        <BracketInfo></BracketInfo>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetData: (payload) => {
      dispatch(resetData(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);

// export default App;
