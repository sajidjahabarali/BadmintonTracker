import { connect } from "react-redux";
import { togglePlayerFrozen } from "../../../redux/Players/players.actions";
import StatsModal from "../../StatsModal/StatsModal";
import { useState } from "react";
import "./IndividualPlayerStatsTable.css";
import { useEffect } from "react";
import BasePlayerStatsTable from "../BasePlayerStatsTable/BasePlayerStatsTable";
import { createShallowCopy } from "../../../common.utils";

function IndividualPlayerStatsTable(props) {
  const [relativeStatsPlayer, setRelativeStatsPlayer] = useState(null);
  const [playersCopy, setPlayersCopy] = useState(
    createShallowCopy(props.playerDetails)
  );

  useEffect(() => {
    setPlayersCopy(createShallowCopy(props.playerDetails));
  }, [props.playerDetails]);

  const handleFreezePlayerToggle = (player) => {
    props.togglePlayerFrozen(player.name);
  };

  const handleRelativeStatsButton = (player) => {
    setRelativeStatsPlayer(player);
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
        <BasePlayerStatsTable
          data={playersCopy}
          setData={setPlayersCopy}
          additionalColumns={getAdditionalColumns()}
          tableName={"individualPlayerStatsTable"}
          saveImagesButtons={{
            elementId: "individualPlayerStatsTable",
            newElements: {},
          }}
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
