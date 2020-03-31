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