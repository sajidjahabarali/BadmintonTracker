import { combineReducers } from "redux";
import playersReducer from "./Players/players.reducer";

const rootReducer = combineReducers({
  players: playersReducer,
});

export default rootReducer;
