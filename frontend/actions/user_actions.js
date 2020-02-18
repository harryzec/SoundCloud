export const RECEIVE_USER = 'RECEIVE_USER'
import * as APIUtil from '../util/users_api_util'

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user: user
})

export const fetchUser = (username) =>dispatch => (
  APIUtil.fetchUser(username)
    .then(user => (
      dispatch(receiveUser(user))
    ))
)