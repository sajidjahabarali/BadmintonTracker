import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./TeammateOpponentToggle.css";

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 40 40"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="m31.958 36.208-5.083-5.041-3.667 3.666-1.583-1.583q-.792-.792-.792-1.958 0-1.167.792-1.959l7.875-7.875q.792-.791 1.958-.791 1.167 0 1.959.791L35 23.042l-3.667 3.666 5.042 5.084q.417.416.417.958t-.417.958l-2.5 2.5q-.417.417-.958.417-.542 0-.959-.417Zm4.709-26.375L17.792 28.708l.583.625q.792.792.792 1.959 0 1.166-.792 1.958l-1.583 1.583-3.667-3.666-5.083 5.041q-.417.417-.959.417-.541 0-.958-.417l-2.5-2.5q-.417-.416-.417-.958t.417-.958l5.042-5.084L5 23.042l1.583-1.584q.792-.791 1.959-.791 1.166 0 1.958.791l.625.584L30 3.167h6.667Zm-25.084 8.25-8.25-8.25V3.167H10l8.25 8.25Z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#ababab",
      },
    },
  },

  "& .MuiSwitch-thumb": {
    backgroundColor: "#424242",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 40 40"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M20 36.625q-5.833-1.458-9.583-6.729t-3.75-11.604v-10l13.333-5 13.333 5v10q0 6.333-3.75 11.604-3.75 5.271-9.583 6.729Z"/></svg>')`,
    },
  },

  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#ababab",
    borderRadius: 20 / 2,
  },
}));

export default function TeammateOpponentToggle(props) {
  const handleTogglePress = (checked) => {
    if (checked) {
      props.setToggle(true);
    } else {
      props.setToggle(false);
    }
  };

  return (
    <div className="toggle-container">
      <FormControlLabel
        onChange={(e) => handleTogglePress(e.target.checked)}
        control={<MaterialUISwitch />}
      />
    </div>
  );
}
