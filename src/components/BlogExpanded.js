import React from 'react'
import { useParams } from 'react-router-dom'


const BlogExpanded = ({ blogs, usersInfo }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const usersBlog = usersInfo.find(userInfo => userInfo.userBlogs.find(user => user.id === id))
  console.log(usersBlog.userName)
  if(!blog){
    return null
  }

  if(!usersBlog){
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href="https://example.com">blog link</a>
      <p>{blog.likes} likes</p>
      <p>added by {usersBlog.userName}</p>
    </div>
  )
}

export default BlogExpanded