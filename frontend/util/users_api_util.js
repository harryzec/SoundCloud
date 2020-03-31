export const fetchUser = username => {
  return $.ajax({
    url: `/api/users/${username}`,
    method: "GET"
  });
};

export const fetchRandomUsers = () => {
  return $.ajax({
    url: `/api/users`
  })
}