import React from 'react'
import { useParams } from 'react-router-dom'

const UserBlog = ({ usersInfo }) => {
  const id = useParams().id
  const blog = usersInfo.find(userInfo => userInfo.userId ===id)
  if(!blog){
    return null
  }

  console.log(blog)

  return (
    <div>
      <h2>{blog.userName}</h2>
      <h3>Added blogs</h3>
      {blog.userBlogs.map((userBlog) => <p key={userBlog.id}>{userBlog.title}</p>)}
    </div>
  )
}

export default UserBlog