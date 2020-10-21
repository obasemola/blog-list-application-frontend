import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserBlog from './components/UserBlogs'
import BlogExpanded from './components/BlogExpanded'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  addBlog, incrementLikes,
  deleteBlogs
} from './reducers/blogReducer'
import { loggedInUser } from './reducers/loggedInUserReducer'
import { getUsersInfo } from './reducers/usersReducer'
import './App.css'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [blogId, setBlogId] = useState(null)

  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notifications)
  const blogs = useSelector(state => state.blogs)
  const use = useSelector(state => state.loggedInuser)
  const usersInfo = useSelector(state => state.user)

  const setResponseAndClass = (newResponse, newClass) => {
    dispatch(setNotification(newResponse, newClass))
    setTimeout(() => {
      dispatch(setNotification('', ''))
    }, 3000)
  }

  useEffect(() => {
    userService.getUsers().then(users => {
      dispatch(getUsersInfo(users))
    })
  },[dispatch])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [dispatch, ])


  useEffect(() => {
    const LoggingInUser = localStorage.getItem('LoggedInUser')
    if (LoggingInUser) {
      const user = JSON.parse(LoggingInUser)
      dispatch(loggedInUser(user))
      setName(user.name)
    }
  }, [dispatch])


  useEffect(() => {
    const PostingUser = JSON.parse(localStorage.getItem('LoggedInUser'))
    if (PostingUser) {
      const newToken = PostingUser.token
      blogService.setToken(newToken)
    }
    return
  }, [])



  const handleVisibilityToggle = (id) => {
    setBlogId(id)
    console.log(blogId)
  }

  const handleClearBlogId = () => {
    console.log(blogId)
    setBlogId(null)
  }

  const handleUsernameChange = (e) => {
    const entry = e.target.value
    setUsername(entry)
  }

  const handlePasswordChange = (e) => {
    const entry = e.target.value
    setPassword(entry)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      blogService.setToken(user.token)
      localStorage.setItem('LoggedInUser', JSON.stringify(user))
      dispatch(loggedInUser(user))
      console.log(use)
      setName(user.name)
      setUsername('')
      setPassword('')

    } catch (error) {
      const newResponse = 'Wrong username or password'
      const newClass = 'error'
      setResponseAndClass(newResponse, newClass)
    }
  }


  const handleLikes = async (e) => {
    const blog = blogs.find((blog) => blog.id === e.target.id)
    const id = e.target.id
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    const data = await blogService.update(id, newBlog)
    dispatch(incrementLikes(id))
  }

  const handleDelete = async (e) => {
    const id = e.target.id
    const title = e.target.title
    const name = e.target.name

    if(window.confirm(`Remove blog ${title} by ${name}`)){
      console.log(id)
      const data = await blogService.remove(id)
      dispatch(deleteBlogs(id))
      setBlogId(null)
    } else {
      return
    }
  }

  const handleBlogPosts = async (newPost) => {
    blogRef.current.toggleVisibility()

    const response = await blogService.create(newPost)
    dispatch(addBlog(response))
    const newResponse = `A new blog ${newPost.title} by ${newPost.author} added`
    const newClass = 'response'
    setResponseAndClass(newResponse, newClass)

  }

  const LogOut = () => {
    console.log('logout')
    const loggingOutUser = localStorage.getItem('LoggedInUser')
    if (loggingOutUser) {
      localStorage.removeItem('LoggedInUser')
      dispatch(loggedInUser(null))
      console.log(use)
    }
    return
  }

  const blogRef = useRef()




  return (
    <Router>
      <div className='container'>
        <div>

          <div id='error' className={notifications.color}>{notifications.notification}</div>
          {use === null && <LoginForm
            handleLogin={handleLogin}
            password={password}
            username={username}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange} />}
        </div>

        {use !== null &&
        <div>
          <Link to="/blogs">blog </Link>
          <Link to="/users"> users </Link>
          {name} logged in
          <button id='logout' onClick={LogOut}>logout</button>
          <h2>blog app</h2>
          <Togglable
            buttonLabel='create'
            ref={blogRef}
          >
            <BlogForm handlePosts={handleBlogPosts} />
          </Togglable>
          <Switch>
            <Route exact path="/blogs/:id">
              <BlogExpanded handleLikes={handleLikes} usersInfo={usersInfo} blogs={blogs}/>
            </Route>
            <Route path="/blogs">
              <h4>Blogs</h4>
              <Blog
                blogs={blogs}
                handleItemClick={handleVisibilityToggle}
                handleClearBlogId={handleClearBlogId}
                name={name}
                visibleId={blogId}
                handleDelete={handleDelete}
                token={use.token}
              />

            </Route>
            <Route exact path="/users/:id">
              <UserBlog usersInfo={usersInfo}/>
            </Route>
            <Route exact path="/users">
              <h2>Users</h2>
              <UserList usersInfo={usersInfo}/>

            </Route>
            <Route exact path="/">
            </Route>
          </Switch>
        </div>}
      </div>
    </Router>
  )
}

export default App