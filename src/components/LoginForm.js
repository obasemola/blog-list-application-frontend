import React from 'react';

export default ({
  username,
  password,
  handlePasswordChange,
  handleUsernameChange,
  handleLogin
}) => (
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