import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { default as MUIModal } from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useCallback } from "react";
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
import { theme } from "../../common.utils";
import { SortType } from "../common.utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function StatsModal(props) {
  const [open, setOpen] = useState(true);
  const [relativeStats, setRelativeStats] = useState([]);
  const [sort, setSort] = useState({
    column: "actualMatchesPlayed",
    type: SortType.ASC,
  });

  const handleClose = () => setOpen(false);
  const handleBlur = () => {
    setOpen(false);
    props.setRelativeStatsPlayer(null);
  };

  const initRelativeStats = useCallback(() => {
    const pairingsCopy = JSON.parse(JSON.stringify(props.pairings));

    setRelativeStats(
      pairingsCopy.filter((pairing) =>
        pairing.players.includes(props.player.name)
      )
    );
  }, [props.pairings, props.player.name]);

  useEffect(() => {
    initRelativeStats();
  }, [initRelativeStats]);

  useEffect(() => {
    console.log(relativeStats);
  }, [relativeStats]);

  // const getTable = () => (
  //   <div className="container">
  //     <ThemeProvider theme={theme}>
  //       <TableContainer component={Paper}>
  //         <Table sx={{ minWidth: 150 }} aria-label="simple table">
  //           <TableHead>
  //             <TableRow>
  //               <TableCell align="left" className="tableHeadCell">
  //                 <div className="leftAlignedIconWrapper">
  //                   <i
  //                     onClick={() => handleSortButton("name")}
  //                     className="fa-solid fa-user"
  //                   ></i>
  //                   {sort.column === "name" && sortIcons(true)}
  //                 </div>
  //               </TableCell>
  //               <TableCell align="right" className="tableHeadCell">
  //                 <i
  //                   onClick={() => handleSortButton("wins")}
  //                   className="fa-solid fa-w"
  //                 ></i>
  //                 {sort.column === "wins" && sortIcons(false)}
  //               </TableCell>
  //               <TableCell align="right" className="tableHeadCell">
  //                 <i
  //                   onClick={() => handleSortButton("losses")}
  //                   className="fa-solid fa-l"
  //                 ></i>
  //                 {sort.column === "losses" && sortIcons(false)}
  //               </TableCell>
  //               <TableCell align="right" className="tableHeadCell">
  //                 <i
  //                   onClick={() => handleSortButton("actualMatchesPlayed")}
  //                   className="fa-solid fa-hashtag"
  //                 ></i>
  //                 {sort.column === "actualMatchesPlayed" && sortIcons(false)}
  //               </TableCell>
  //               <TableCell align="right" className="tableHeadCell">
  //                 <i
  //                   onClick={() => handleSortButton("winRate")}
  //                   className="fa-solid fa-percent"
  //                 ></i>
  //                 {sort.column === "winRate" && sortIcons(false)}
  //               </TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {relativeStats.map((player, key) => (
  //               <TableRow key={key}>
  //                 <TableCell align="left">{player.name}</TableCell>
  //                 <TableCell align="right">{player.wins}</TableCell>
  //                 <TableCell align="right">{player.losses}</TableCell>
  //                 <TableCell align="right">
  //                   {player.actualMatchesPlayed}
  //                 </TableCell>
  //                 <TableCell align="right">
  //                   {getWinRate(player.wins, player.actualMatchesPlayed)}
  //                 </TableCell>
  //                 <TableCell align="center">
  //                   <i
  //                     onClick={() => handleFreezePlayerToggle(player)}
  //                     className={
  //                       (player.frozen ? "frozen " : "") +
  //                       "fa-regular fa-snowflake icon"
  //                     }
  //                   ></i>

  //                   <i
  //                     onClick={() => handleRelativeStatsButton(player)}
  //                     className={
  //                       (relativeStatsPlayer === player ? "showStats " : "") +
  //                       "fa-solid fa-chart-simple icon"
  //                     }
  //                   ></i>
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //     </ThemeProvider>
  //   </div>
  // );
  return (
    <div>
      <MUIModal
        open={open}
        onClose={handleClose}
        onBlur={() => handleBlur()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.player.name}'s Relative Stats
          </Typography>
          {/* {relativeStats.length > 0 && getTable()} */}
        </Box>
      </MUIModal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    playerDetails: state.players.playerDetails ?? [],
    pairings: state.players.pairings ?? [],
  };
};

export default connect(mapStateToProps)(StatsModal);
