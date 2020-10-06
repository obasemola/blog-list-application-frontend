import React from 'react'


const Blog = ({ token, handleDelete, handleLikes, name, blog, visibleId, handleItemClick, handleClearBlogId })  => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visibleId ? 'none' : '' }
  const hideWhenInvisible = { display: visibleId ? '' : 'none' }

  return (
    <div>
      <div className='mainDiv' style={blogStyle}>
        <div className='firstDiv'>
          {blog.title} {blog.author}
          <button id='view' style={showWhenVisible} onClick={() => handleItemClick(blog.id)}>view</button>
          <button style={hideWhenInvisible} onClick={() => handleClearBlogId()}>hide</button>
        </div>

        {blog.id === visibleId &&
          <div className='secondDiv'>
            <div>
              {blog.url}
            </div>
            <div id='likes'>
            likes {blog.likes}
              <button className='like' id={blog.id} onClick={handleLikes}>like</button>
            </div>
            <div>
              {name}
            </div>
            {token && <button
              name={blog.author}
              title={blog.title}
              onClick={handleDelete}
              className='deleteBlog'
              id={blog.id}>delete</button>}
          </div>
        }
      </div>
    </div>
  )

}
export default Blog
