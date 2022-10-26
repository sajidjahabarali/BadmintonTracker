import {
  RESET_DATA,
  ADD_PLAYER,
  ADD_GAME_TO_PLAYER,
  ADD_WIN_TO_PLAYER,
  ADD_LOSS_TO_PLAYER,
  TOGGLE_PLAYER_FROZEN,
} from "./players.types";

export const resetData = (payload) => {
  return {
    type: RESET_DATA,
    payload: payload,
  };
};

export const addPlayer = (payload) => {
  return {
    type: ADD_PLAYER,
    payload: payload,
  };
};

export const togglePlayerFrozen = (payload) => {
  return {
    type: TOGGLE_PLAYER_FROZEN,
    payload: payload,
  };
};

export const addGameToPlayer = (payload) => {
  return {
    type: ADD_GAME_TO_PLAYER,
    payload: payload,
  };
};

export const addWinToPlayer = (payload) => {
  return {
    type: ADD_WIN_TO_PLAYER,
    payload: payload,
  };
};

export const addLossToPlayer = (payload) => {
  return {
    type: ADD_LOSS_TO_PLAYER,
    payload: payload,
  };
};
