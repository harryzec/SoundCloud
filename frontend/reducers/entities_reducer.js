import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import songReducer from './song_reducer'
import recentCreate from './recently_created'
import songShow from './songshow'
import RecentPlays from './played_songs'
import PlaylistReducer from './playlist_reducer'
import RecentPlaylist from './playlist_create_reducer'
import searchReducer from './search_reducer'
import QueueReducer from './queue_reducer'

const entitiesReducer = combineReducers({
  users: usersReducer,
  songs: songReducer,
  created_recent: recentCreate,
  songShow: songShow,
  recentplays: RecentPlays,
  PlaylistReducer: PlaylistReducer,
  RecentPlaylist: RecentPlaylist,
  searched: searchReducer,
  Queue: QueueReducer
});

export default entitiesReducer;