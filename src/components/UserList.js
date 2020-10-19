import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ userInfo }) => {

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