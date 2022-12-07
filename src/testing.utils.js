export const matchMakingMetricsLogs = (
  newPlayerDetailsState,
  newPairingsState
) => {
  const sdsForPlayers = [];
  for (const playerKey in newPlayerDetailsState) {
    const sdForPlayer = getStandardDeviation(
      newPairingsState
        .filter((pairing) =>
          pairing.players.includes(newPlayerDetailsState[playerKey].name)
        )
        .map((pairing) => pairing.teammates.matchesPlayed)
    );

    console.log(
      "standard deviation of matchesPlayed for ",
      newPlayerDetailsState[playerKey].name,
      ":",
      sdForPlayer
    );

    sdsForPlayers.push(sdForPlayer);
  }
  console.log(
    "average 'sd of matchesPlayed with teammates for each player': ",
    sdsForPlayers.reduce((prevVal, currentVal) => {
      return prevVal + currentVal;
    }, 0) / newPlayerDetailsState.length
  );
  console.log("============================");
};

function getStandardDeviation(array) {
  if (!array || array.length === 0) {
    return 0;
  }
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );
}
