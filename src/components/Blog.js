import React, { useState } from 'react'


const Blog = ({  name, blog, visibleId, handleItemClick, handleClearBlogId })  => {
  const [showDetails, setShowDetails] = useState(false)

  const revealDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visibleId ? 'none' : '' };
  const hideWhenInvisible = { display: visibleId ? '' : 'none' }

  return (
    <div>
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button style={showWhenVisible} onClick={() => handleItemClick(blog.id)}>view</button>
          <button style={hideWhenInvisible} onClick={() => handleClearBlogId()}>hide</button>
        </div>
   
    <div style={{display: blog.id === visibleId ? '' : 'none'}}>
    <div>
      {blog.url}
    </div>
    <div>
      likes {blog.likes}
      <button>like</button>
    </div>
    <div>
      {name}
    </div>
</div>
 
      
        
      </div>
    </div>
  )
  
}
export default Blog
