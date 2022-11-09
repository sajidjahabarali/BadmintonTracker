import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { default as MUIModal } from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function StatsModal(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);
  const handleBlur = () => {
    setOpen(false);
    props.setRelativeStatsPlayer(null);
  };

  return (
    <div>
      <MUIModal
        open={open}
        onClose={handleClose}
        onBlur={() => handleBlur()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.player.name}'s Relative Stats
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.player.name}'s stats here
          </Typography>
        </Box>
      </MUIModal>
    </div>
  );
}
