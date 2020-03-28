export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'
import * as APIUtil from '../util/search_api_util';

export const receiveSearch = (search) => {
  return({
  type: RECEIVE_SEARCH,
  search: search
})}

export const fetchSearch = (search) =>dispatch => (
  APIUtil.fetchSearch(search)
    .then(search => (
      dispatch(receiveSearch(search))
    ))
)