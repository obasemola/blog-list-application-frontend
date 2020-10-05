import React, { useState } from 'react'

const BlogForm = ({ handlePosts }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addPosts = (e) => {
    e.preventDefault()
    handlePosts({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }



  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addPosts}>
        <div>
          title:
          <input
            className='title'
            type='text'
            value={title}
            name='title'
            onChange={((e) => setTitle(e.target.value))}/>
        </div>
        <div>
          author:
          <input
            className='author'
            type='text'
            value={author}
            name='author'
            onChange={((e) => setAuthor(e.target.value))}/>
        </div>
        <div>
          url:
          <input
            className='url'
            type='text'
            value={url}
            name='url'
            onChange={((e) => setUrl(e.target.value))}/>
        </div>
        <button id='create'>create</button>
      </form>
    </div>
  )
}

BlogForm.displayName = BlogForm


export default BlogForm