import * as APIUtil from '../util/follow_api_util';

export const createFollow = like => dispatch => {
  return APIUtil.createFollow(like)
};

export const deleteFollow = follow_id => dispatch => {
  return APIUtil.deleteFollow(follow_id)
}