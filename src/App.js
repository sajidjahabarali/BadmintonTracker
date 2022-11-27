import "./App.css";
import { connect } from "react-redux";
import NameInput from "./Components/NameInput/NameInput";
import TrackerInfo from "./Components/TrackerInfo/TrackerInfo";
import { resetPlayerData } from "./redux/Players/players.actions";
import { useState } from "react";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./common.utils";

function App(props) {
  const [resetButtonPressed, setResetButtonPressed] = useState(false);

  const handleResetButton = () => {
    setResetButtonPressed(true);
    localStorage.clear();
    props.resetPlayerData();
  };

  useEffect(() => {
    setResetButtonPressed(false);
  }, [resetButtonPressed]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <i
          onClick={() => handleResetButton()}
          className="reset-button fa-solid fa-arrow-rotate-left"
        ></i>
        <Typography variant="h1">Badminton Tracker</Typography>
        <div className="container">
          <NameInput></NameInput>
          <TrackerInfo resetButtonPressed={resetButtonPressed}></TrackerInfo>
        </div>
      </ThemeProvider>
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
