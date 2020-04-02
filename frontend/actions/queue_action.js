export const ADD_QUEUE = 'ADD_QUEUE'
export const REPLACE_QUEUE = 'REPLACE_QUEUE'
export const PLAY_FROM = 'PLAY_FROM'
export const NEXT_SONG = 'NEXT_SONG'

export const addQueue = songs => {
  return{
  type: ADD_QUEUE,
  songs
}}

export const replaceQueue = queue => {
  return{
    type: REPLACE_QUEUE,
    queue
  }
}

export const playedSong = () => {
  return {
    type: NEXT_SONG
  }
}

// export const removeQueue = songs => {
//   t
// }