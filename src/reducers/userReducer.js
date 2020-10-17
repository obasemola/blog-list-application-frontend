export const retrieveUser = (data) => {
  return {
    type: 'RETRIEVE',
    data
  }
}


const userReducer = (state = null, action) => {
  switch (action.type) {

  case 'RETRIEVE':
    return action.data

  default:
    return state
  }

}


export default userReducer