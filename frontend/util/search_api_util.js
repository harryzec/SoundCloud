

export const fetchSearch = (search) => (
  $.ajax({
    method: 'GET',
    url: `/api/searches/search/${search}`
  })
)