export const SortType = {
  ASC: "ASC",
  DESC: "DESC",
};

export const sortPlayerData = (data, column, sortType) => {
  return data.sort((player1, player2) => {
    if (column === "winRate") {
      if (!bothPlayerWinRatesExist(player1, player2)) return 0;
      switch (sortType) {
        case SortType.ASC:
          return parseFloat(
            getWinRate(player1.wins, player1.actualMatchesPlayed)
          ) < parseFloat(getWinRate(player2.wins, player2.actualMatchesPlayed))
            ? -1
            : 1;
        case SortType.DESC:
          return parseFloat(
            getWinRate(player1.wins, player1.actualMatchesPlayed)
          ) > parseFloat(getWinRate(player2.wins, player2.actualMatchesPlayed))
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

export const handleSortButton = (
  currentData,
  setData,
  column,
  currentSort,
  setSort
) => {
  const sortTypeKeys = Object.keys(SortType);
  const nextSortTypeKey =
    column === currentSort.column
      ? sortTypeKeys[sortTypeKeys.indexOf(currentSort.type) + 1] ??
        sortTypeKeys[0]
      : sortTypeKeys[0];

  const sortedPlayersCopy = sortPlayerData(
    currentData,
    column,
    nextSortTypeKey
  );
  setSort({
    column: column,
    type: nextSortTypeKey,
  });

  setData(sortedPlayersCopy);
};

export const getWinRate = (wins, actualMatchesPlayed) =>
  actualMatchesPlayed > 0
    ? ((parseFloat(wins) / parseFloat(actualMatchesPlayed)) * 100).toFixed(1)
    : "-";

const bothPlayerWinRatesExist = (player1, player2) => {
  return (
    getWinRate(player1.wins, player1.actualMatchesPlayed) !== "-" &&
    getWinRate(player2.wins, player2.actualMatchesPlayed) !== "-"
  );
};

export const getPlayerDetailsColumnHeaders = () => [
  { align: "left", column: "name", iconClassName: "user" },
  { align: "right", column: "wins", iconClassName: "w" },
  { align: "right", column: "losses", iconClassName: "l" },
  { align: "right", column: "actualMatchesPlayed", iconClassName: "hashtag" },
  { align: "right", column: "winRate", iconClassName: "percent" },
];
