import {ADD_PLAYER, ADD_GAME_TO_PLAYER} from "./players.types";

export const addPlayer = (payload) => {
  return {
    type: ADD_PLAYER,
    payload: payload
  }
}

export const addGameToPlayer = (payload) => {
  return {
    type: ADD_GAME_TO_PLAYER,
    payload: payload
  }
}