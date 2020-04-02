export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_RANDOM_USERS = 'RECEIVE_RANDOM_USERS'
import * as APIUtil from '../util/users_api_util'
export const RECEIVE_SONGS = 'RECEIVE_SONGS';


export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user: user
})

export const receiveContent = content => {
  debugger
  return{
  type: RECEIVE_SONGS,
  songs: content
}}

export const receiveRandomUsers = (users) => ({
  type: RECEIVE_RANDOM_USERS,
  users
})

export const fetchUser = (username) =>dispatch => (
  APIUtil.fetchUser(username)
    .then(user => (
      dispatch(receiveUser(user))
    ))
)

export const fetchRecent = (username) => dispatch => {
  return APIUtil.fetchRecent(username)
    .then(content => (
      dispatch(receiveContent(content))
    ))
}

export const fetchRandomUsers = () => dispatch => (
  APIUtil.fetchRandomUsers()
  .then(users => (
    dispatch(receiveRandomUsers(users))
  ))
)

export const fetchFollowerContent = (id) => dispatch => (
  APIUtil.fetchFollowerContent(id)
  .then(content => (dispatch(receiveContent(content))))
)