export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT',
    data: blogs
  }
}

export const addBlog = ({ title, author, url, id, likes, comments }) => {
  return {
    type: 'ADD',
    data: {
      title,
      author,
      url,
      id,
      likes,
      comments
    }
  }
}

export const incrementLikes = (id) => {
  return {
    type: 'INCREMENTLIKES',
    id
  }
}

export const deleteBlogs = (id) => {
  return {
    type: 'DELETE',
    id
  }
}

export const addComment = (id, data) => {
  return {
    type: 'ADDCOMMENT',
    id,
    data
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
      } else {
        return el
      }
    })

  case 'ADDCOMMENT':
    return state.map((el) => {
      if(el.id === action.id) {
        return {
          ...el,
          comments: el.comments.concat(action.data)
        }
      } else {
        return el
      }
    })

  case 'DELETE':
    return state.filter((el) => el.id !== action.id)

  default:
    return state
  }
}

export default blogReducer