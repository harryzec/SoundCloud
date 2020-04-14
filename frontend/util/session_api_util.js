export const login = user => {
  
  return $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
};

export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
);

export const logout = () => {
  
  return  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
};

export const verifyUser = email => (
  $.ajax({
    method: 'GET',
    url: '/api/users/',
    data: { email }
  })
)

export const updateUser = (user, id = null) => {
  
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id || id}`,
    data: user,
    processData: false,
    contentType: false
  })
}