import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useState } from "react";
import { connect } from "react-redux";
import { addPlayer } from "../../redux/Players/players.actions";
import { useEffect } from "react";

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
      if (
        !(
          inputValue.includes(" ") ||
          nameAlreadyExists(inputValue.toUpperCase())
        )
      ) {
        setValidName(true);
        setShowNameCannotContainSpacesError(false);
        setShowNameAlreadyExistsError(false);
      }
      if (inputValue.includes(" ")) {
        setValidName(false);
        setShowNameCannotContainSpacesError(true);
      }
      if (nameAlreadyExists(inputValue.toUpperCase())) {
        setValidName(false);
        setShowNameAlreadyExistsError(true);
      }
    } else {
      setValidName(true);
      setShowNameCannotContainSpacesError(false);
      setShowNameAlreadyExistsError(false);
    }
  };

  useEffect(() => {
    updateValidity();
  });

  const nameAlreadyExists = (name) => {
    for (let player in props.players.players) {
      if (props.players.players[player].name === name) return true;
    }

    return false;
  };

  return (
    <div>
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
          Add name
        </Button>
      </div>
      {!validName && (
        <div className="errorMessage">
          <i className="fa-solid fa-circle-exclamation"></i>
          {showNameAlreadyExistsError && " Name already exists."}
          {showNameCannotContainSpacesError && " Name cannot contain spaces."}
        </div>
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
    addPlayer: (payload) => {
      dispatch(addPlayer(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NameInput);
