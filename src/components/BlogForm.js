import React from 'react'

const BlogForm = ({ handlePosts }) => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')

  let title
  let author
  let url
  const addPosts = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const url = e.target.url.value
    handlePosts({
      title,
      author,
      url
    })
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
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

          />
        </div>
        <div>
          author:
          <input
            className='author'
            type='text'
            value={author}
            name='author'

          />
        </div>
        <div>
          url:
          <input
            className='url'
            type='text'
            value={url}
            name='url'

          />
        </div>
        <button id='create'>create</button>
      </form>
    </div>
  )
}

BlogForm.displayName = BlogForm


export default BlogForm