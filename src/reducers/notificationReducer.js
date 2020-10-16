export const setNotification = (notification) => {
  return {
    type: 'SHOW',
    notification
  }
}


const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.notification

  default:
    return state
  }

}

export default notificationReducer