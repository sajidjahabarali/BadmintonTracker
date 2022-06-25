import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useState } from "react";
import { connect } from "react-redux";
import {
  addPlayer,
  addGameToPlayer,
} from "../../redux/Players/players.actions";

function NameInput() {
  const [inputValue, setInputValue] = useState("");
  const getInputValue = () => {
    console.log(inputValue);
  };

  return (
    <div>
      <Input
        id="outlined-basic"
        label="Enter player name"
        variant="outlined"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button
        variant="text"
        onClick={() => {
          getInputValue();
        }}
      >
        Add name
      </Button>
    </div>
  );
}

export default NameInput;
