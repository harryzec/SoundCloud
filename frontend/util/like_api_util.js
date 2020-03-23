export const createLike = like => {
  return $.ajax({
      url: '/api/likes',
      method: 'POST',
      data: { like }
  });
};


export const deleteLike = like_id => {
  return $.ajax({
      method: 'DELETE',
      url: `/api/likes/${like_id}`
  });
};
