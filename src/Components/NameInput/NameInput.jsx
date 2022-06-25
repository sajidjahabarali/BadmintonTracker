import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useState } from "react";
import { connect } from "react-redux";
import { addPlayer } from "../../redux/Players/players.actions";

function NameInput(props) {
  const [inputValue, setInputValue] = useState("");
  const getInputValue = () => inputValue;

  return (
    <div>
      <Input
        id="outlined-basic"
        label="Enter player name"
        variant="outlined"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button
        variant="text"
        onClick={() => {
          props.addPlayer(getInputValue());
          setInputValue("");
        }}
      >
        Add name
      </Button>
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
