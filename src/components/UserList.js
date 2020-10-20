import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = ({ usersInfo }) => {

  return (
    <div>
      <Table striped className='table table-dark'>
        <tbody>
          {usersInfo.map(userInfo =>
            <tr key={userInfo.userId}>
              <td>
                <Link to={`/users/${userInfo.userId}`}>
                  {userInfo.userName}
                </Link>
              </td>
              <td className='blogStyle'>
                {userInfo.numberOfBlogs}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )


}

export default UserList