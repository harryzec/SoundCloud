import { connect } from 'react-redux';
import UploadForm from './upload';
import { createSong } from '../../actions/song_action'

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
  username: state.session.currentUser.username
})

const mDTP = (dispatch) => ({
  createSong: (song) => dispatch(createSong(song))
})

export default connect(mSTP, mDTP)(UploadForm)