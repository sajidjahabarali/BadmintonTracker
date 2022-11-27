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
        {getPlayerDetailsColumnHeaders().map((header, key) => {
          return (
            <TableCell key={key} align={header.align} className="tableHeadCell">
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

  const getPlayerOptionsButtons = (player, index) => {
    return [
      <i
        key={"freeze" + index}
        onClick={() => handleFreezePlayerToggle(player)}
        className={
          (player.frozen ? "frozen " : "") + "fa-regular fa-snowflake icon"
        }
      ></i>,

      <i
        key={"stats" + index}
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
      getTableBodyCellContent: (player, index) =>
        getPlayerOptionsButtons(player, index),
    },
  ];

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
          additionalColumns={getAdditionalColumns()}
        ></BasePlayerStatsTable>
      </div>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    playerDetails: state.players.playerDetails ?? [],
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
