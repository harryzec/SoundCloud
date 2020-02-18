import React from 'react'
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";
import { logout } from './util/session_api_util'
import { createSong, fetchSongsByArtist } from './util/songs_api_util'

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.logout = logout()

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.createSong = createSong;
  window.fetchSongs = fetchSongsByArtist 

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});