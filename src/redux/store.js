import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { loadFromLocalStorage, saveToLocalStorage } from "../common.utils";

const LOCAL_STORAGE_KEY = "globalState";
const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadFromLocalStorage(LOCAL_STORAGE_KEY),
});
store.subscribe(() => {
  saveToLocalStorage(store.getState(), LOCAL_STORAGE_KEY);
});

export default store;
