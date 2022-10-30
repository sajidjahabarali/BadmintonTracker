import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { loadFromLocalStorage, saveToLocalStorage } from "../common.utils";

const localStorageKey = "globalState";
const store = createStore(rootReducer, loadFromLocalStorage(localStorageKey));
store.subscribe(() => {
  saveToLocalStorage(store.getState(), localStorageKey);
});

export default store;
