export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
);

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

export const verifyUser = email => (
  $.ajax({
    method: 'GET',
    url: '/api/users/',
    data: { email }
  })
)

export const updateUser = (user, id = null) => {
  debugger
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id || id}`,
    data: user,
    processData: false,
    contentType: false
  })
}