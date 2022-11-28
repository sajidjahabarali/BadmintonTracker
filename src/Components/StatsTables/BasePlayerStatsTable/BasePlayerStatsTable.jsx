import React from "react";
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
import { theme } from "../../../common.utils";
import { getWinRate, getPlayerDetailsColumnHeaders } from "../../common.utils";
import SortableColumnHeader from "../../SortableColumnHeader/SortableColumnHeader";
import { useState } from "react";
import { SortType } from "../../common.utils";
function BasePlayerStatsTable(props) {
  const [sort, setSort] = useState({
    column: "actualMatchesPlayed",
    type: SortType.ASC,
  });

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

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {getColumnHeaders()}
                {props.additionalColumns !== undefined
                  ? props.additionalColumns.map((column, index) => {
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
              {props.data.map((player, index) => (
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
                  {props.additionalColumns !== undefined
                    ? props.additionalColumns.map((column, index) => {
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
      </ThemeProvider>
    </div>
  );
}

export default BasePlayerStatsTable;
