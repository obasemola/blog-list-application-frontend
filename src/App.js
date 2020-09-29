import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css'


const LoginForm = ({ username, password, handlePasswordChange, handleUsernameChange, handleLogin }) => (
  <div>
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
  const [nameOfClass, setNameOfClass] = useState('')
  const [responseMessage, setresponseMessage] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const LoggingInUser = localStorage.getItem('LoggedInUser');
    if(LoggingInUser) {
      const user = JSON.parse(LoggingInUser);
      setUser(user)
    }
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

    try {
      const response = await loginService.login({
        username,
        password
      });
      localStorage.setItem('LoggedInUser', JSON.stringify(response.data))
      setUser(response.data);
      console.log(response.data)
      setName(response.data.name)
      setUsername('');
      setPassword('');
    } catch (error) {
      setNameOfClass('error')
      setresponseMessage('Wrong credentials')
      setTimeout(() => {
        setNameOfClass('')
        setresponseMessage('')
      }, 3000)
    }



  }


  return (
    <div>
      <h2>blogs</h2>
      <h2>Log in to application</h2>
      <div className={nameOfClass}>{responseMessage}</div>
      {user === null && <LoginForm
      handleLogin={handleLogin}
      password={password}
      username={username}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}/>}
      {user !== null && 
        <div>
            ${name} logged in
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
        </div>}

    </div>
  )
}

export default App