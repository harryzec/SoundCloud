import React from 'react';
import { connect } from 'react-redux';
import { verifyUser } from '../../actions/session_actions'
import VerifyUserForm from './verify_user';
import { login } from '../../actions/session_actions';

const mSTP = state => ({

})

const mDTP = state => ({
  verifyUsername: (username) => dispatch(verifyUser(username)),
  processForm: (user) => dispatch(login(user))
})

export default connect(mSTP, mDTP)(VerifyUserForm)