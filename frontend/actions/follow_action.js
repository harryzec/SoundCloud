import * as APIUtil from '../util/follow_api_util';

export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW'

export const receiveFollow = follow => {
  return {
    type: RECEIVE_FOLLOW,
    follow
  }
}


export const createFollow = follow => dispatch => {
  return APIUtil.createFollow(follow).then(follow => dispatch(receiveFollow(follow)))
};

export const deleteFollow = follow_id => dispatch => {
  return APIUtil.deleteFollow(follow_id)
}