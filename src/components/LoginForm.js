import React from 'react'

const LoginForm = ({
  username,
  password,
  handlePasswordChange,
  handleUsernameChange,
  handleLogin
}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='username'
          value={username}
          name='username'
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='password'
          onChange={handlePasswordChange}
        />
      </div>
      <button id='login'>login</button>
    </form>

  </div>

)

LoginForm.displayName = 'Blogform'

export default LoginForm