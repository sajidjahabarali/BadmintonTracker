import { connect } from "react-redux";
import { togglePlayerFrozen } from "../../redux/Players/players.actions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./PlayerTable.css";

const getWinRate = (wins, actualGamesPlayed) =>
  actualGamesPlayed > 0
    ? ((parseFloat(wins) / parseFloat(actualGamesPlayed)) * 100).toFixed(1)
    : "-";

function PlayerTable(props) {
  const handleFreezePlayerToggle = (player) => {
    props.togglePlayerFrozen(player.name);
  };

  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">G</TableCell>
              <TableCell align="right">WR (%)</TableCell>
              <TableCell align="center">
                <i className="fa-solid fa-gear"></i>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.players.players.map((player, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="right">{player.wins}</TableCell>
                <TableCell align="right">{player.losses}</TableCell>
                <TableCell align="right">{player.actualGamesPlayed}</TableCell>
                <TableCell align="right">
                  {getWinRate(player.wins, player.actualGamesPlayed)}
                </TableCell>
                <TableCell align="center">
                  <i
                    onClick={() => handleFreezePlayerToggle(player)}
                    className={
                      (player.frozen ? "frozen " : "") +
                      "fa-regular fa-snowflake icon"
                    }
                  ></i>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    togglePlayerFrozen: (payload) => {
      dispatch(togglePlayerFrozen(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTable);
