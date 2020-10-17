export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT',
    data: blogs
  }
}

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

export const incrementLikes = (id) => {
  return {
    type: 'INCREMENTLIKES',
    id
  }
}

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT':
    return action.data

  case 'ADD':
    return state.concat(action.data)

  case 'INCREMENTLIKES':
    return state.map((el) => {
      if(el.id === action.id) {
        return {
          ...el,
          likes: el.likes + 1
        }
      } else{
        return el
      }
    })

  default:
    return state
  }
}

export default blogReducer