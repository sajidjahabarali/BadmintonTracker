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
import { useEffect } from "react";

function BasePlayerStatsTable(props) {
  useEffect(() => {
    console.log(props.additionalColumns);
  }, [props.additionalColumns]);

  const getColumnHeaders = () => {
    return getPlayerDetailsColumnHeaders().map((header, index) => {
      return (
        <TableCell key={index} align={header.align} className="tableHeadCell">
          <SortableColumnHeader
            align={header.align}
            data={props.data}
            setData={props.setData}
            column={header.column}
            sort={props.sort}
            setSort={props.setSort}
            iconClassName={"fa-solid fa-" + header.iconClassName ?? ""}
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
                {props.additionalColumns.length > 0
                  ? props.additionalColumns.map((column) => {
                      return (
                        <TableCell
                          align={column.align}
                          className="tableHeadCell"
                        >
                          <i
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
              {props.data.map((player, key) => (
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
                  {props.additionalColumns.length > 0
                    ? props.additionalColumns.map((column) => {
                        return (
                          <TableCell align={column.align}>
                            {column.getTableBodyCellContent(player)}
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
