import React from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../../../common.utils";
import { getWinRate, getPlayerDetailsColumnHeaders } from "../../common.utils";
import SortableColumnHeader from "../../SortableColumnHeader/SortableColumnHeader";
import { useState } from "react";
import { SortType } from "../../common.utils";
import "../StatsTables.css";
import {
  saveImageButtonHandler,
  renderAndSaveImagesButtonHandler,
} from "../common.utils";
import { useEffect } from "react";
import {
  mapPairingsToOpponentPlayerStats,
  mapPairingsToTeammatePlayerStats,
} from "../../common.utils";
import "./BasePlayerStatsTable.css";

function BasePlayerStatsTable(props) {
  const [sort, setSort] = useState({
    column: "actualMatchesPlayed",
    type: SortType.ASC,
  });

  const [renderAllRelativeStats, setRenderAllRelativeStats] = useState(false);
  const relativeStatsContainerIdPrefix = "relativeStatsContainer";

  useEffect(() => {
    if (renderAllRelativeStats) {
      renderAndSaveImagesButtonHandler(
        props.data.map((player) => player.name),
        relativeStatsContainerIdPrefix,
        setRenderAllRelativeStats
      );
    }
  }, [props, renderAllRelativeStats]);

  const getColumnHeaders = () => {
    return getPlayerDetailsColumnHeaders().map((header, index) => {
      return (
        <TableCell key={index} align={header.align} className="tableHeadCell">
          <SortableColumnHeader
            align={header.align}
            data={props.data}
            setData={props.setData}
            column={header.column}
            sort={sort}
            setSort={setSort}
            iconClassName={header.iconClassName}
          ></SortableColumnHeader>
        </TableCell>
      );
    });
  };

  const getTable = (
    data = props.data,
    tableName = props.tableName,
    additionalColumns = props.additionalColumns
  ) => {
    return (
      <div id={tableName} className="imageToSave">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {getColumnHeaders()}
                {additionalColumns !== undefined
                  ? additionalColumns.map((column, index) => {
                      return (
                        <TableCell
                          key={index}
                          align={column.align}
                          className="tableHeadCell"
                        >
                          <i
                            key={index}
                            className={
                              "fa-solid fa-" + column.headerIconClassName
                            }
                          ></i>
                        </TableCell>
                      );
                    })
                  : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((player, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{player.name}</TableCell>
                  <TableCell align="right">{player.wins}</TableCell>
                  <TableCell align="right">{player.losses}</TableCell>
                  <TableCell align="right">
                    {player.actualMatchesPlayed}
                  </TableCell>
                  <TableCell align="right">
                    {getWinRate(player.wins, player.actualMatchesPlayed)}
                  </TableCell>
                  <TableCell align="right">
                    {(player.streak > 0 ? "+" : "") + player.streak}
                  </TableCell>
                  {additionalColumns !== undefined
                    ? additionalColumns.map((column, index) => {
                        return (
                          <TableCell key={index} align={column.align}>
                            {column.getTableBodyCellContent(player, index)}
                          </TableCell>
                        );
                      })
                    : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const getHiddenRelativeStatsTables = () => {
    return (
      <div className="hidden">
        {props.data.map((player, index) => {
          return (
            <div key={index} id={relativeStatsContainerIdPrefix + player.name}>
              <div className="relativeStatsSubContainer">
                <Typography>{player.name}'s Teammate Stats</Typography>
                {getTable(
                  mapPairingsToTeammatePlayerStats(player.name, props.pairings)
                )}
              </div>

              <div className="relativeStatsSubContainer">
                <Typography>{player.name}'s Opponents Stats</Typography>
                {getTable(
                  mapPairingsToOpponentPlayerStats(player.name, props.pairings)
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const getSaveTableButtons = () => {
    return (
      <div className="saveTableButtons">
        {props.saveImagesButtons.newElements && (
          <i
            className={"fa-solid saveTableIcon fa-images"}
            onClick={() => setRenderAllRelativeStats(true)}
          ></i>
        )}
        <i
          className={"fa-solid saveTableIcon fa-image"}
          onClick={() =>
            saveImageButtonHandler(props.saveImagesButtons.elementId)
          }
        ></i>
      </div>
    );
  };

  return (
    <div className="tableContainer">
      <ThemeProvider theme={theme}>
        {getTable()}
        {getSaveTableButtons()}
        {renderAllRelativeStats && getHiddenRelativeStatsTables()}
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pairings: state.players.pairings ?? [],
  };
};

export default connect(mapStateToProps)(BasePlayerStatsTable);
