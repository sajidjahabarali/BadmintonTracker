import { connect } from "react-redux";
import { togglePlayerFrozen } from "../../redux/Players/players.actions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../common.utils";
import "./PlayerTable.css";

const getWinRate = (wins, actualGamesPlayed) =>
  actualGamesPlayed > 0
    ? ((parseFloat(wins) / parseFloat(actualGamesPlayed)) * 100).toFixed(1)
    : "-";

function PlayerTable(props) {
  const [relativeStatsPlayer, setRelativeStatsPlayer] = useState(null);

  const handleFreezePlayerToggle = (player) => {
    props.togglePlayerFrozen(player.name);
  };

  const handleRelativeStatsButton = (player) => {
    // setRelativeStatsPlayer(player);
  };

  const getTable = () => (
    <div className="container">
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <i class="fa-solid fa-user"></i>
                </TableCell>
                <TableCell align="right">
                  <i class="fa-solid fa-w"></i>
                </TableCell>
                <TableCell align="right">
                  <i class="fa-solid fa-l"></i>
                </TableCell>
                <TableCell align="right">
                  <i class="fa-solid fa-hashtag"></i>
                </TableCell>
                <TableCell align="right">
                  <i class="fa-solid fa-percent"></i>
                </TableCell>
                <TableCell align="center">
                  <i className="fa-solid fa-gear"></i>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.players.players.map((player, key) => (
                <TableRow key={key}>
                  <TableCell align="left">{player.name}</TableCell>
                  <TableCell align="right">{player.wins}</TableCell>
                  <TableCell align="right">{player.losses}</TableCell>
                  <TableCell align="right">
                    {player.actualMatchesPlayed}
                  </TableCell>
                  <TableCell align="right">
                    {getWinRate(player.wins, player.actualMatchesPlayed)}
                  </TableCell>
                  <TableCell align="center">
                    <i
                      onClick={() => handleFreezePlayerToggle(player)}
                      className={
                        (player.frozen ? "frozen " : "") +
                        "fa-regular fa-snowflake icon"
                      }
                    ></i>
                    <i
                      onClick={() => handleRelativeStatsButton(player)}
                      className="fa-solid fa-chart-simple icon"
                    ></i>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );

  return props.players.players.length > 0 ? (
    <div>
      {/* <Modal
        handleOpen={() => {
          return relativeStatsPlayer !== null;
        }}
        player={props.players.players[0]}
      ></Modal> */}
      {getTable()}
    </div>
  ) : null;
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
