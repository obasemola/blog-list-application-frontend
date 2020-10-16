import { createStore, combineReducers } from 'redux'
import notificationReducer from '../reducers/notificationReducer'



const store = createStore(notificationReducer)
store.subscribe(() => {
  const newState = store.getState()
  console.log(newState.notification)
  console.log(newState.color)
})

export default store