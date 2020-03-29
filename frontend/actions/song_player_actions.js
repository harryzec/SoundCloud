export const SONG_PLAYING = 'SONG_PLAYING';
export const SONG_PAUSED = 'SONG_PAUSED'; 
export const TIMER = 'TIMER'
export const EVENT = 'EVENT'
export const UPDATE_WAVE = 'UPDATE_WAVE'


export const playSong = (song) => ({
  type: SONG_PLAYING,
  song: song
})

export const pauseSong = (song) => ({
  type: SONG_PAUSED,
  song: song
})

export const timer = (time) => ({
  type: TIMER,
  time
})

export const waveClick = (event) => ({
  type: EVENT,
  event: event
})

export const updateWave = (time) => ({
  type: UPDATE_WAVE,
  time
})