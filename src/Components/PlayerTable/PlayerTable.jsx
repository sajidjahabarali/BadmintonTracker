import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./PlayerTable.css";

const getWinRate = (wins, actualGamesPlayed) =>
  ((parseFloat(wins) / parseFloat(actualGamesPlayed)) * 100).toFixed(1);

function PlayerTable(props) {
  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell align="right">Wins</TableCell>
              <TableCell align="right">Losses</TableCell>
              <TableCell align="right">Games Played</TableCell>
              <TableCell align="right">Win Rate (%)</TableCell>
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

export default connect(mapStateToProps)(PlayerTable);
