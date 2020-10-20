import React from 'react'
import { Link } from 'react-router-dom'


const Blog = ({ blog, handleDelete })  => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <div className='mainDiv' style={blogStyle}>
        <div className='firstDiv'>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      </div>
    </div>
  )

}
export default Blog
