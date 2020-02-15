export const SONG_PLAYING = 'SONG_PLAYING';
export const SONG_PAUSED = 'SONG_PAUSED'; 


export const playSong = (song) => ({
  type: SONG_PLAYING,
  song: song
})

export const pauseSong = (song) => ({
  type: SONG_PAUSED,
  song: song
})