export const fetchUser = username => {
  return $.ajax({
    url: `/api/users/${username}`,
    method: "GET"
  });
};

export const fetchRandomUsers = () => {
  return $.ajax({
    method: "GET",
    url: '/api/users/random/follow'
  });
}

export const fetchRecent = username => {
  return $.ajax({
    url: `api/users/recent_creations/${username}`
  })
}

export const fetchFollowerContent = (id) => {
  return $.ajax({
    url: `api/users/follower_content/${id}`
  })
}