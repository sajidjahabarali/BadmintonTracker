import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useState } from "react";
import { connect } from "react-redux";
import { addPlayer } from "../../redux/Players/players.actions";
import { useEffect } from "react";
import { theme } from "../../common.utils";
import "./NameInput.css";
import { ThemeProvider } from "@mui/material";

function NameInput(props) {
  const [inputValue, setInputValue] = useState("");
  const [validName, setValidName] = useState(false);
  const [showNameAlreadyExistsError, setShowNameAlreadyExistsError] =
    useState(false);
  const [
    showNameCannotContainSpacesError,
    setShowNameCannotContainSpacesError,
  ] = useState(false);

  const updateValidity = () => {
    if (inputValue) {
      if (nameIsValid(inputValue)) {
        setValidName(true);
        setShowNameCannotContainSpacesError(false);
        setShowNameAlreadyExistsError(nameAlreadyExists(false));
      } else {
        setValidName(false);
        setShowNameAlreadyExistsError(
          nameAlreadyExists(inputValue.trim().toUpperCase())
        );
        setShowNameCannotContainSpacesError(inputValue.includes(" "));
      }
    } else {
      setValidName(false);
      setShowNameAlreadyExistsError(false);
      setShowNameCannotContainSpacesError(false);
    }
  };

  useEffect(() => {
    updateValidity();
  });

  const nameIsValid = (name) =>
    !(name.includes(" ") || nameAlreadyExists(name.toUpperCase()));

  const nameAlreadyExists = (name) => {
    for (let player in props.playerDetails) {
      if (props.playerDetails[player].name === name) return true;
    }

    return false;
  };

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <div className="userInput">
          <Input
            id="outlined-basic"
            label="Enter player name"
            placeholder="Add players (minimum 4)"
            variant="outlined"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Button
            variant="text"
            disabled={!validName}
            onClick={() => {
              props.addPlayer(inputValue.toUpperCase());
              setInputValue("");
            }}
          >
            <i className="fa-solid fa-user-plus"></i>
          </Button>
        </div>
        {(showNameAlreadyExistsError || showNameCannotContainSpacesError) && (
          <div className="errorMessage">
            <i className="fa-solid fa-circle-exclamation"></i>
            {showNameAlreadyExistsError && " Name already exists."}
            {showNameCannotContainSpacesError && " Name cannot contain spaces."}
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    playerDetails: state.players.playerDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: (payload) => {
      dispatch(addPlayer(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NameInput);
