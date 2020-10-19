export const getUsersInfo = (users) => {
  return {
    type: 'GETINFO',
    users
  }
}


const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'GETINFO':
    return action.users.map((user) => {
      return {
        userName: user.name,
        numberOfBlogs: user.blogs.length,
        userId: user.id,
        userBlogs: user.blogs
      }
    })

  default:
    return state
  }
}


export default usersReducer