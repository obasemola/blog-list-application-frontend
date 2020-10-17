export const addBlog = ({ title, author, url, id }) => {
  return {
    type: 'ADD',
    data: {
      title,
      author,
      url,
      id
    }
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT',
    data: blogs
  }
}

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT':
    return action.data

  case 'ADD':
    return state.concat(action.data)

  default:
    return state
  }
}

export default blogReducer