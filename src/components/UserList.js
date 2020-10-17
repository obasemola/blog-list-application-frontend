import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const UserList = ({ userInfo }) => (
  <div>
    <Router>
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
    </Router>
  </div>
)

export default UserList