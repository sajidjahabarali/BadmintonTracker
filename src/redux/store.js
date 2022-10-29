import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { loadFromLocalStorage, saveToLocalStorage } from "../common.utils";

const store = createStore(
  rootReducer,
  loadFromLocalStorage("persistantGlobalState")
);
store.subscribe(() => {
  saveToLocalStorage(store.getState(), "persistantGlobalState");
});

export default store;
