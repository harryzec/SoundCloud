import * as APIUtil from '../util/like_api_util';

export const createLike = like => dispatch => {
  return APIUtil.createLike(like)
};

export const deleteLike = like_id => dispatch => {
  return APIUtil.deleteLike(like_id)
}