import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import songReducer from './song_reducer'

const entitiesReducer = combineReducers({
  users: usersReducer,
  songs: songReducer
});

export default entitiesReducer;