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

const SortType = {
  ASC: "ASC",
  DESC: "DESC",
};

function PlayerTable(props) {
  const [relativeStatsPlayer, setRelativeStatsPlayer] = useState(null);
  const [playersCopy, setPlayersCopy] = useState(props.playerDetails);
  const [sort, setSort] = useState({
    column: "actualMatchesPlayed",
    type: SortType.ASC,
  });

  useEffect(() => {
    setPlayersCopy(props.playerDetails);
  }, [props.playerDetails]);

  const sortPlayersCopy = (column, sortType) => {
    return playersCopy.sort((player1, player2) => {
      if (column === "winRate") {
        switch (sortType) {
          case SortType.ASC:
            return getWinRate(player1.wins, player1.actualMatchesPlayed) <
              getWinRate(player2.wins, player2.actualMatchesPlayed)
              ? -1
              : 1;
          case SortType.DESC:
            return getWinRate(player1.wins, player1.actualMatchesPlayed) >
              getWinRate(player2.wins, player2.actualMatchesPlayed)
              ? -1
              : 1;
          default:
            return 0;
        }
      } else {
        switch (sortType) {
          case SortType.ASC:
            return player1[column] < player2[column] ? -1 : 1;
          case SortType.DESC:
            return player1[column] > player2[column] ? -1 : 1;
          default:
            return 0;
        }
      }
    });
  };

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

    const sortedPlayersCopy = sortPlayersCopy(column, nextSortTypeKey);
    setSort({
      column: column,
      type: nextSortTypeKey,
    });

    setPlayersCopy(sortedPlayersCopy);
  };

  const handleRelativeStatsButton = (player) => {
    setRelativeStatsPlayer(player);
  };

  const sortIcons = (leftAlignedIcon) => (
    <div className="sortIcons">
      {sort.type === SortType.ASC && (
        <i
          className={
            "fa-solid fa-sort-up sortIcon up" +
            (leftAlignedIcon ? " leftAlignedSortIcon" : "")
          }
        ></i>
      )}
      {sort.type === SortType.DESC && (
        <i
          className={
            "fa-solid fa-sort-down sortIcon down" +
            (leftAlignedIcon ? " leftAlignedSortIcon" : "")
          }
        ></i>
      )}
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
                  <div className="leftAlignedIconWrapper">
                    <i
                      onClick={() => handleSortButton("name")}
                      className="fa-solid fa-user"
                    ></i>
                    {sort.column === "name" && sortIcons(true)}
                  </div>
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i
                    onClick={() => handleSortButton("wins")}
                    className="fa-solid fa-w"
                  ></i>
                  {sort.column === "wins" && sortIcons(false)}
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i
                    onClick={() => handleSortButton("losses")}
                    className="fa-solid fa-l"
                  ></i>
                  {sort.column === "losses" && sortIcons(false)}
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i
                    onClick={() => handleSortButton("actualMatchesPlayed")}
                    className="fa-solid fa-hashtag"
                  ></i>
                  {sort.column === "actualMatchesPlayed" && sortIcons(false)}
                </TableCell>
                <TableCell align="right" className="tableHeadCell">
                  <i
                    onClick={() => handleSortButton("winRate")}
                    className="fa-solid fa-percent"
                  ></i>
                  {sort.column === "winRate" && sortIcons(false)}
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
    playerDetails: state.players.playerDetails ?? [],
    pairings: state.players.pairings ?? [],
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
