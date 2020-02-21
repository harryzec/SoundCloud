export const SONG_PLAYING = 'SONG_PLAYING';

const RecentPlays = (state= {}, action) => {
  // debugger
  Object.freeze(state);

  switch(action.type) {
    case SONG_PLAYING:
      let newState = Object.assign({}, state, {[action.song.id]: action.song})
      return newState;
    default:
      return state;
  }
}

export default RecentPlays