import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { default as MUIModal } from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useCallback } from "react";
import BasePlayerStatsTable from "../StatsTables/BasePlayerStatsTable/BasePlayerStatsTable";
import TeammateOpponentToggle from "../TeammateOpponentToggle/TeammateOpponentToggle";
import "./StatsModal.css";

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
    const pairingsCopy = JSON.parse(JSON.stringify(props.pairings));

    setTeammatePlayerStats(
      pairingsCopy
        .filter((pairing) => pairing.players.includes(props.player.name))
        .map((pairing) => {
          return {
            name: pairing.players.find(
              (player) => player !== props.player.name
            ),
            wins: pairing.teammates.wins,
            losses: pairing.teammates.losses,
            actualMatchesPlayed: pairing.teammates.matchesPlayed,
            streak: pairing.teammates.streak,
          };
        })
    );
    setOpponentPlayerStats(
      pairingsCopy
        .filter((pairing) => pairing.players.includes(props.player.name))
        .map((pairing) => {
          const isPlayer1 = pairing.players[0] === props.player.name;
          return {
            name: pairing.players.find(
              (player) => player !== props.player.name
            ),
            wins: isPlayer1
              ? pairing.opponents.player1WinsAndPlayer2Losses
              : pairing.opponents.player2WinsAndPlayer1Losses,
            losses: isPlayer1
              ? pairing.opponents.player2WinsAndPlayer1Losses
              : pairing.opponents.player1WinsAndPlayer2Losses,
            actualMatchesPlayed: pairing.opponents.matchesPlayed,
            streak: isPlayer1
              ? pairing.opponents.player1WinStreakAndPlayer2LossStreak
              : 0 - pairing.opponents.player1WinStreakAndPlayer2LossStreak,
          };
        })
    );
  }, [props.pairings, props.player]);

  useEffect(() => {
    initRelativePlayerStats();
  }, [initRelativePlayerStats]);

  return (
    <div>
      <MUIModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                ></BasePlayerStatsTable>
              )
            : teammatePlayerStats.length > 0 && (
                <BasePlayerStatsTable
                  data={teammatePlayerStats}
                  setData={setTeammatePlayerStats}
                ></BasePlayerStatsTable>
              )}
        </Box>
      </MUIModal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pairings: state.players.pairings ?? [],
  };
};

export default connect(mapStateToProps)(StatsModal);
