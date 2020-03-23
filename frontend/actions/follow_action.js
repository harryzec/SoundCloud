import * as APIUtil from '../util/follow_api_util';

export const createFollow = follow => dispatch => {
  return APIUtil.createFollow(follow)
};

export const deleteFollow = follow_id => dispatch => {
  return APIUtil.deleteFollow(follow_id)
}