import { combineReducers, createStore } from "redux";

import { boardReducer } from "../features/board/boardSlice.js";

// setting up state.board:
const rootReducer = combineReducers({
  board: boardReducer,
});

export const store = createStore(rootReducer);
