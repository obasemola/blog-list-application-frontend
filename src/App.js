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
  const [name, setName] = useState('');
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  useEffect(() => {
    const PostingUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    if(PostingUser) {
      const newToken = PostingUser.token
      blogService.setToken(newToken)
    }
    return
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
      const user = await loginService.login({
        username,
        password
      });

      blogService.setToken(user.token);
      localStorage.setItem('LoggedInUser', JSON.stringify(user))
      setUser(user);
      setName(user.name)
      setUsername('');
      setPassword('');
    } catch (error) {
      setNameOfClass('error')
      setresponseMessage('Wrong username or password')
      setTimeout(() => {
        setNameOfClass('')
        setresponseMessage('')
      }, 3000)
    }

  }

  const handleBlogPosts = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      author,
      url
    }

    const response = await blogService.create(newPost);
    setBlogs(blogs.concat(response));
    setNameOfClass('response')
    setresponseMessage(`A new blog ${title} by ${author} added`)
    setTimeout(() => {
      setNameOfClass('')
      setresponseMessage('')
    }, 3000)
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  const LogOut = (e) => {
    const loggingOutUser = localStorage.getItem('LoggedInUser');
    if(loggingOutUser){
      localStorage.removeItem('LoggedInUser');
      setUser(null);

    }
    return
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
            <button onClick={LogOut}>logout</button>
            <h2>Create new</h2>
            <form onSubmit={handleBlogPosts}>
              <div>
                title:
                <input
                type='text'
                value={title}
                name='title'
                onChange={((e) => setTitle(e.target.value))}/>
              </div>
              <div>
                author:
                <input
                type='text'
                value={author}
                name='author'
                onChange={((e) => setAuthor(e.target.value))}/>
              </div>
              <div>
                url:
                <input
                type='text'
                value={url}
                name='url'
                onChange={((e) => setUrl(e.target.value))}/>
              </div>
              <button>create</button>
            </form>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
        </div>}

    </div>
  )
}

export default App