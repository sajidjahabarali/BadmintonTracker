import { connect } from "react-redux";
import { togglePlayerFrozen } from "../../redux/Players/players.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
} from "@mui/material";
import StatsModal from "../StatsModal/StatsModal";
import { useState } from "react";
import { theme } from "../../common.utils";
import "./PlayerTable.css";
import { useEffect } from "react";

function PlayerTable(props) {
  const [relativeStatsPlayer, setRelativeStatsPlayer] = useState(null);
  const [playersCopy, setPlayersCopy] = useState(props.players.players);
  const [sort, setSort] = useState({});

  useEffect(() => {
    setPlayersCopy(props.players.players);
  }, [props.players.players]);

  const getWinRate = (wins, actualGamesPlayed) =>
    actualGamesPlayed > 0
      ? ((parseFloat(wins) / parseFloat(actualGamesPlayed)) * 100).toFixed(1)
      : "-";

  const handleFreezePlayerToggle = (player) => {
    props.togglePlayerFrozen(player.name);
  };

  const handleRelativeStatsButton = (player) => {
    setRelativeStatsPlayer(player);
  };

  const sortIcons = () => (
    <div className="sortIcons">
      <i className="fa-solid fa-sort-up sortIcon up"></i>
      <i className="fa-solid fa-sort-down sortIcon down"></i>
    </div>
  );

  const getTable = () => (
    <div className="container">
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className="tableHeadCell">
                  <i className="fa-solid fa-user"></i>
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i className="fa-solid fa-w"></i>
                  {sortIcons()}
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i className="fa-solid fa-l"></i>
                  {sortIcons()}
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i className="fa-solid fa-hashtag"></i>
                  {sortIcons()}
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i
                    onClick={() => console.log("percent click")}
                    className="fa-solid fa-percent"
                  ></i>
                  {sortIcons()}
                </TableCell>
                <TableCell align="center" className="tableHeadCell">
                  <i className="fa-solid fa-gear"></i>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playersCopy.map((player, key) => (
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
                      className={
                        (relativeStatsPlayer === player ? "showStats " : "") +
                        "fa-solid fa-chart-simple icon"
                      }
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

  return playersCopy.length > 0 ? (
    <div>
      {relativeStatsPlayer !== null ? (
        <StatsModal
          setRelativeStatsPlayer={setRelativeStatsPlayer}
          player={relativeStatsPlayer}
        ></StatsModal>
      ) : null}
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
