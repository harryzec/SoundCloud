import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import songReducer from './song_reducer'
import recentCreate from './recently_created'
import songShow from './songshow'

const entitiesReducer = combineReducers({
  users: usersReducer,
  songs: songReducer,
  created_recent: recentCreate,
  songShow: songShow
});

export default entitiesReducer;