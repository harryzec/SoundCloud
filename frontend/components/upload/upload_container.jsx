import { connect } from 'react-redux';
import UploadForm from './upload';

const mSTP = (state) => ({
  song: {
    title: '',
    genre: '',
    track: null,
    user_id: state.session.currentUser.id
  }
})

const mDTP = (dispatch) => ({
  validTrack: (info)=> validTrack(info)
})

export default connect(mSTP, mDTP)(UploadForm)