import { createStore, combineReducers } from 'redux'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer
})

const store = createStore(reducer)
store.subscribe(() => {
  const newState = store.getState()
  console.log(newState.notification)
  console.log(newState.color)
})

export default store