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
import { useEffect, useCallback } from "react";

const SortType = {
  ASC: "ASC",
  DESC: "DESC",
};

function PlayerTable(props) {
  const [relativeStatsPlayer, setRelativeStatsPlayer] = useState(null);
  const [playersCopy, setPlayersCopy] = useState(props.players.players);
  const [sort, setSort] = useState({ column: null, type: undefined });

  useEffect(() => {
    setPlayersCopy(props.players.players);
  }, [props.players.players]);

  const sortTable = useCallback(() => {
    const sortedPlayersCopy = playersCopy.sort((player1, player2) => {
      console.log(sort.column);
      if (sort.column === "winRate") {
        switch (sort.type) {
          case "ASC":
            return getWinRate(player1.wins, player1.actualMatchesPlayed) <
              getWinRate(player2.wins, player2.actualMatchesPlayed)
              ? 1
              : -1;
          case "DESC":
            return getWinRate(player1.wins, player1.actualMatchesPlayed) >
              getWinRate(player2.wins, player2.actualMatchesPlayed)
              ? 1
              : -1;
          default:
            return 0;
        }
      } else {
        switch (sort.type) {
          case "ASC":
            return player1[sort.column] < player2[sort.column] ? 1 : -1;
          case "DESC":
            return player1[sort.column] > player2[sort.column] ? 1 : -1;
          default:
            return 0;
        }
      }
    });

    setPlayersCopy(sortedPlayersCopy);
  }, [playersCopy, sort.column, sort.type]);

  useEffect(() => {
    console.log(sort);
    sortTable();
  }, [sort, sortTable]);

  const getWinRate = (wins, actualMatchesPlayed) =>
    actualMatchesPlayed > 0
      ? ((parseFloat(wins) / parseFloat(actualMatchesPlayed)) * 100).toFixed(1)
      : "-";

  const handleFreezePlayerToggle = (player) => {
    props.togglePlayerFrozen(player.name);
  };

  const handleSortButton = (column) => {
    const sortTypeKeys = Object.keys(SortType);
    const nextSortTypeKey =
      column === sort.column
        ? sortTypeKeys[sortTypeKeys.indexOf(sort.type) + 1] ?? sortTypeKeys[0]
        : sortTypeKeys[0];

    setSort({
      column: column,
      type: nextSortTypeKey,
    });
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
                  <i
                    onClick={() => handleSortButton("name")}
                    className="fa-solid fa-user"
                  ></i>
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i
                    onClick={() => handleSortButton("wins")}
                    className="fa-solid fa-w"
                  ></i>
                  {sortIcons()}
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i
                    onClick={() => handleSortButton("losses")}
                    className="fa-solid fa-l"
                  ></i>
                  {sortIcons()}
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i
                    onClick={() => handleSortButton("actualMatchesPlayed")}
                    className="fa-solid fa-hashtag"
                  ></i>
                  {sortIcons()}
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i
                    onClick={() => handleSortButton("winRate")}
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
