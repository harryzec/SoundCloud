import * as APIUtil from '../util/session_api_util'
import { openModal, closeModal } from './modal_actions'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
// export const VERIFY_CURRENT_USER = 'VERIFY_CURRENT_USER';
// export const NO_CURRENT_USER = 'VERIFY_CURRENT_USER';

export const receiveCurrentUser = (currentUser, id='') => {
  // debugger
  return{
  type: RECEIVE_CURRENT_USER,
  currentUser,
  id
}};

// export const founder = found => ({
//   type: VERIFY_CURRENT_USER,
//   found
// })

// export const founder = notFound => ({
//   type: NO_CURRENT_USER,
//   notFound
// })

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const login = user => dispatch => {
  debugger
  return APIUtil.login(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
  };

export const logout = () => dispatch => (
  APIUtil.logout().then(user => (
    dispatch(receiveCurrentUser(null, user.id))
  ))
);


export const verifyUser = (username) => dispatch => (
  APIUtil.verifyUser(username)
    .then(email => dispatch(openModal('login', email.email)), 
        (email, valid)  => dispatch(openModal('signup', email.responseJSON.email))
         
    )
)

export const updateUser = (user, id = null) => dispatch => (
  APIUtil.updateUser(user, id)
    .then(user => (
    dispatch(receiveCurrentUser(user))
)))