import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { default as MUIModal } from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useCallback } from "react";
import BasePlayerStatsTable from "../StatsTables/BasePlayerStatsTable/BasePlayerStatsTable";
import TeammateOpponentToggle from "../TeammateOpponentToggle/TeammateOpponentToggle";
import "./StatsModal.css";
import { createShallowCopy } from "../../common.utils";
import {
  mapPairingsToOpponentPlayerStats,
  mapPairingsToTeammatePlayerStats,
} from "../common.utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

function StatsModal(props) {
  const [open, setOpen] = useState(true);
  const [teammatePlayerStats, setTeammatePlayerStats] = useState([]);
  const [opponentPlayerStats, setOpponentPlayerStats] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleClose = () => {
    setOpen(false);
    props.setRelativeStatsPlayer(null);
  };

  const initRelativePlayerStats = useCallback(() => {
    const pairingsCopy = createShallowCopy(props.pairings);

    setTeammatePlayerStats(
      mapPairingsToTeammatePlayerStats(props.player.name, pairingsCopy)
    );
    setOpponentPlayerStats(
      mapPairingsToOpponentPlayerStats(props.player.name, pairingsCopy)
    );
  }, [props.pairings, props.player]);

  useEffect(() => {
    initRelativePlayerStats();
  }, [initRelativePlayerStats]);

  return (
    <MUIModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          id={
            (toggle ? "OpponentStats-" : "TeammateStats-") + props.player.name
          }
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.player.name}'s Relative Stats
          </Typography>
          <div className="teammate-opponent-toggle-container">
            <TeammateOpponentToggle
              setToggle={setToggle}
            ></TeammateOpponentToggle>
          </div>

          {toggle
            ? opponentPlayerStats.length > 0 && (
                <BasePlayerStatsTable
                  data={opponentPlayerStats}
                  setData={setOpponentPlayerStats}
                  relativePlayer={props.player.name}
                  tableName={"OpponentTable-" + props.player.name}
                  saveImagesButtons={{
                    elementId: "OpponentStats-" + props.player.name,
                  }}
                ></BasePlayerStatsTable>
              )
            : teammatePlayerStats.length > 0 && (
                <BasePlayerStatsTable
                  data={teammatePlayerStats}
                  setData={setTeammatePlayerStats}
                  relativePlayer={props.player.name}
                  tableName={"TeammateTable-" + props.player.name}
                  saveImagesButtons={{
                    elementId: "TeammateStats-" + props.player.name,
                  }}
                ></BasePlayerStatsTable>
              )}
        </div>
      </Box>
    </MUIModal>
  );
}

const mapStateToProps = (state) => {
  return {
    pairings: state.players.pairings ?? [],
  };
};

export default connect(mapStateToProps)(StatsModal);
