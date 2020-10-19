import React from 'react'
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import UserBlog from './UserBlogs'

const UserList = ({ userInfo, usersInfo }) => {

  return (
    <div>

      <table>
        <tbody>
          <tr>
            <td>
              <Link to={`/users/${userInfo.userId}`}>
                {userInfo.userName}
              </Link>
            </td>
            <td>{userInfo.numberOfBlogs}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )


}

export default UserList