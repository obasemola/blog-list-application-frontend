import { createStore, combineReducers } from 'redux'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import loggedInUserReducer from '../reducers/loggedInUserReducer'
import usersReducer from '../reducers/usersReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  loggedInuser: loggedInUserReducer,
  user: usersReducer
})

const store = createStore(reducer)
store.subscribe(() => {
  const newState = store.getState()
  console.log(newState.user)
})

export default store