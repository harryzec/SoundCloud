export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_RANDOM_USERS = 'RECEIVE_RANDOM_USERS'
import * as APIUtil from '../util/users_api_util'

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user: user
})

export const receieRandomUsers = (users) => ({
  type: RECEIVE_RANDOM_USERS,
  users
})

export const fetchUser = (username) =>dispatch => (
  APIUtil.fetchUser(username)
    .then(user => (
      dispatch(receiveUser(user))
    ))
)

export const fetchRandomUsers = () => dispatch => (
  APIUtil.fetchRandomUsers()
  .then(users => (
    dispatch(receiveRandomUsers(users))
  ))
)