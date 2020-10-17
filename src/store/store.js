import { createStore, combineReducers } from 'redux'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(reducer)
store.subscribe(() => {
  const newState = store.getState()
  console.log(newState.user)
  // console.log(newState.color)
})

export default store