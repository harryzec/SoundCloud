export const createFollow = follow => {
  return $.ajax({
      url: '/api/follows',
      method: 'POST',
      data: { follow }
  });
};


export const deleteLike = follow_id => {
  return $.ajax({
      method: 'DELETE',
      url: `/api/follows/${follow_id}`
  });
};
