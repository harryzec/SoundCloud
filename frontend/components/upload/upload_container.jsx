import { connect } from 'react-redux';
import UploadForm from './upload';
import { createSong, fetchSongsByArtist } from '../../actions/song_action'

const mSTP = (state) => ({
  song: {
    title: '',
    genre: 'sample',
    track: null,
    user_id: state.session.currentUser.id,
    description: 'sample',
    hyperlink: ''
  },
  newSong: state.entities.created_recent,
  username: state.session.currentUser.username,
  userId: state.session.currentUser.id,
  artistSongs: Object.values(state.entities.songs)
})

const mDTP = (dispatch) => ({
  createSong: (song) => dispatch(createSong(song)),
  fetchSongsByArtist: (userId) => dispatch(fetchSongsByArtist(userId))
})

export default connect(mSTP, mDTP)(UploadForm)