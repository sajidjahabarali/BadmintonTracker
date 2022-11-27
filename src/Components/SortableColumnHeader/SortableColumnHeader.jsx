import { SortType, handleSortButton } from "../common.utils";
import "./SortableColumnHeader.css";
export default function SortableColumnHeader(props) {
  const sortIcons = (leftAlignedIcon) => (
    <div className="sortIcons">
      {props.sort.type === SortType.ASC && (
        <i
          className={
            "fa-solid fa-sort-up sortIcon up" +
            (leftAlignedIcon ? " leftAlignedSortIcon" : "")
          }
        ></i>
      )}
      {props.sort.type === SortType.DESC && (
        <i
          className={
            "fa-solid fa-sort-down sortIcon down" +
            (leftAlignedIcon ? " leftAlignedSortIcon" : "")
          }
        ></i>
      )}
    </div>
  );

  return (
    <div className={props.align === "left" ? "leftAlignedIconWrapper" : ""}>
      <i
        onClick={() =>
          handleSortButton(
            props.data,
            props.setData,
            props.column,
            props.sort,
            props.setSort
          )
        }
        className={props.iconClassName}
      ></i>
      {props.sort.column === props.column && sortIcons(props.align === "left")}
    </div>
  );
}
