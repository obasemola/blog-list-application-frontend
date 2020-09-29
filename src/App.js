import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login'


const LoginForm = ({ username, password, handlePasswordChange, handleUsernameChange, handleLogin }) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='username'
          value={username}
          name='username'
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='password'
          onChange={handlePasswordChange}
          />
      </div>
      <button>login</button>
    </form>

  </div>

)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleUsernameChange = (e) => {
    const entry = e.target.value
    setUsername(entry)
  }

  const handlePasswordChange = (e) => {
    const entry = e.target.value
    setPassword(entry)
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('logging in');

    const response = await loginService.login({
      username,
      password
    });

    setUser(response)

  }


  return (
    <div>
      <h2>blogs</h2>
      {user === null && <LoginForm
      handleLogin={handleLogin}
      password={password}
      username={username}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}/>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App