import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

function NameInput() {
  return (
    <div>
      <Input id="outlined-basic" label="Enter player name" variant="outlined" />
      <Button variant="text">Add name</Button>
    </div>
  );
}

export default NameInput;
