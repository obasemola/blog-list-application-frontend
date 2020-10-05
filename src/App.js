import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './App.css'


const App = ({ author, title }) => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [nameOfClass, setNameOfClass] = useState('')
  const [responseMessage, setresponseMessage] = useState('')
  const [name, setName] = useState('')
  const [blogId, setBlogId] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => {
        return b.likes - a.likes
      }))
    )
  }, [])


  useEffect(() => {
    const LoggingInUser = localStorage.getItem('LoggedInUser')
    if (LoggingInUser) {
      const user = JSON.parse(LoggingInUser)
      setUser(user)
      setName(user.name)
    }
  }, [])


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
  }

  const handleClearBlogId = () => {
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
    console.log('logging in')

    try {
      const user = await loginService.login({
        username,
        password
      })

      blogService.setToken(user.token)
      localStorage.setItem('LoggedInUser', JSON.stringify(user))
      setUser(user)
      setName(user.name)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNameOfClass('error')
      setresponseMessage('Wrong username or password')
      setTimeout(() => {
        setNameOfClass('')
        setresponseMessage('')
      }, 3000)
    }
  }

  const getToken = () => {
    const tokenUser = JSON.parse(localStorage.getItem('LoggedInUser'))
    const toBeUsedToken = tokenUser.token
    return toBeUsedToken
  }




  const handleLikes = async (e) => {
    const blog = blogs.find((blog) => blog.id === e.target.id)
    const id = e.target.id
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    const data = await blogService.update(id, newBlog)
    setBlogs(blogs.map((blog) => blog.id === id ? data : blog))
  }

  const handleDelete = async (e) => {
    const id = e.target.id
    const title = e.target.title
    const name = e.target.name

    if(window.confirm(`Remove blog ${title} by ${name}`)){
      const data = await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setBlogId(null)
    } else {
      return
    }
  }

  const handleBlogPosts = async (newPost) => {
    blogRef.current.toggleVisibility()

    const response = await blogService.create(newPost)
    setBlogs(blogs.concat(response))
    setNameOfClass('response')
    setresponseMessage(`A new blog ${title} by ${author} added`)
    setTimeout(() => {
      setNameOfClass('')
      setresponseMessage('')
    }, 3000)

  }

  const LogOut = () => {
    const loggingOutUser = localStorage.getItem('LoggedInUser')
    if (loggingOutUser) {
      localStorage.removeItem('LoggedInUser')
      setUser(null)

    }
    return
  }

  const blogRef = useRef()



  return (
    <div>
      <h2>blogs</h2>
      <div id='error' className={nameOfClass}>{responseMessage}</div>
      {user === null && <LoginForm
        handleLogin={handleLogin}
        password={password}
        username={username}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange} />}

      {user !== null &&
        <div>
          {name} logged in
          <button id='logout' onClick={LogOut}>logout</button>
          <Togglable
            buttonLabel='create'
            ref={blogRef}
          >
            <BlogForm handlePosts={handleBlogPosts} />
          </Togglable>
          {blogs.map(blog =>
            <Blog
              handleItemClick={handleVisibilityToggle}
              handleClearBlogId={handleClearBlogId}
              key={blog.id}
              blog={blog}
              name={name}
              visibleId={blogId}
              handleLikes={handleLikes}
              handleDelete={handleDelete}
              token={getToken()}
            />)}
        </div>}

    </div>
  )
}

export default App