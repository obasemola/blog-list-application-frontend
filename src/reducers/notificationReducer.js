export const setNotification = (notification, color) => {
  return {
    type: 'SHOW',
    notification, color
  }
}


const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW':
    return {
      notification: action.notification,
      color: action.color
    }

  default:
    return state
  }

}

export default notificationReducer