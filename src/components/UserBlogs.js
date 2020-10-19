import React from 'react'
import { useParams } from 'react-router-dom'

const UserBlog = ({ usersInfo }) => {
  const id = useParams().id
  const user = usersInfo.find(userInfo => userInfo.userId ===id)
  if(!user){
    return null
  }

  console.log(user)

  return (
    <div>
      <h2>{user.userName}</h2>
      <h3>Added blogs</h3>
      {user.userBlogs.map((userBlog) => <p key={userBlog.id}>{userBlog.title}</p>)}
    </div>
  )
}

export default UserBlog