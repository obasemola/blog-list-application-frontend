export const addBlog = (title, author, url) => {
  return {
    type: 'ADD',
    data: {
      title,
      author,
      url
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

    default:
      return state
  }
}

export default blogReducer