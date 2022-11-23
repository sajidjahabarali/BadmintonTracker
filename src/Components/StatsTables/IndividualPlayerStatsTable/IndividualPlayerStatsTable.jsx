import { connect } from "react-redux";
import { togglePlayerFrozen } from "../../../redux/Players/players.actions";
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
import StatsModal from "../../StatsModal/StatsModal";
import { useState } from "react";
import { theme } from "../../../common.utils";
import "./IndividualPlayerStatsTable.css";
import { useEffect } from "react";
import {
  SortType,
  getWinRate,
  getPlayerDetailsColumnHeaders,
} from "../../common.utils";
import SortableColumnHeader from "../../SortableColumnHeader/SortableColumnHeader";
import BasePlayerStatsTable from "../BasePlayerStatsTable/BasePlayerStatsTable";

function IndividualPlayerStatsTable(props) {
  const [relativeStatsPlayer, setRelativeStatsPlayer] = useState(null);
  const [playersCopy, setPlayersCopy] = useState(
    JSON.parse(JSON.stringify(props.playerDetails))
  );
  const [sort, setSort] = useState({
    column: "actualMatchesPlayed",
    type: SortType.ASC,
  });

  useEffect(() => {
    setPlayersCopy(JSON.parse(JSON.stringify(props.playerDetails)));
  }, [props.playerDetails]);

  const handleFreezePlayerToggle = (player) => {
    props.togglePlayerFrozen(player.name);
  };

  const handleRelativeStatsButton = (player) => {
    setRelativeStatsPlayer(player);
  };

  const getColumnHeaders = () => {
    return (
      <TableRow>
        {getPlayerDetailsColumnHeaders().map((header, index) => {
          return (
            <TableCell
              key={index}
              align={header.align}
              className="tableHeadCell"
            >
              <SortableColumnHeader
                align={header.align}
                data={playersCopy}
                setData={setPlayersCopy}
                column={header.column}
                sort={sort}
                setSort={setSort}
                iconClassName={"fa-solid fa-" + header.iconClassName ?? ""}
              ></SortableColumnHeader>
            </TableCell>
          );
        })}
        <TableCell align="center" className="tableHeadCell">
          <i className="fa-solid fa-gear"></i>
        </TableCell>
      </TableRow>
    );
  };

  const getPlayerOptionsButtons = (player) => {
    return [
      <i
        onClick={() => handleFreezePlayerToggle(player)}
        className={
          (player.frozen ? "frozen " : "") + "fa-regular fa-snowflake icon"
        }
      ></i>,

      <i
        onClick={() => handleRelativeStatsButton(player)}
        className={
          (relativeStatsPlayer === player ? "showStats " : "") +
          "fa-solid fa-chart-simple icon"
        }
      ></i>,
    ];
  };

  const getAdditionalColumns = () => [
    {
      align: "center",
      headerIconClassName: "gear",
      getTableBodyCellContent: (player) => getPlayerOptionsButtons(player),
    },
  ];

  const getTable = () => (
    <div className="container">
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableHead>{getColumnHeaders()}</TableHead>
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

  return (
    playersCopy.length > 0 && (
      <div>
        {relativeStatsPlayer !== null ? (
          <StatsModal
            setRelativeStatsPlayer={setRelativeStatsPlayer}
            player={relativeStatsPlayer}
          ></StatsModal>
        ) : null}
        {/* {getTable()} */}
        <BasePlayerStatsTable
          data={playersCopy}
          setData={setPlayersCopy}
          sort={sort}
          setSort={setSort}
          additionalColumns={getAdditionalColumns()}
        ></BasePlayerStatsTable>
      </div>
    )
  );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualPlayerStatsTable);
