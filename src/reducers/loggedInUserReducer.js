export const loggedInUser = (data) => {
  return {
    type: 'RETRIEVE',
    data
  }
}


const loggedInUserReducer = (state = null, action) => {
  switch (action.type) {

  case 'RETRIEVE':
    return action.data

  default:
    return state
  }

}


export default loggedInUserReducer