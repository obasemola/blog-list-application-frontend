import React from 'react'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={addPosts}>
        <Form.Group>
          <div>
            <Form.Label>title:</Form.Label>

            <Form.Control
              className='title'
              type='text'
              value={title}
              name='title'

            />
          </div>
          <div>
            <Form.Label>author:</Form.Label>
            <Form.Control
              className='author'
              type='text'
              value={author}
              name='author'

            />
          </div>
          <div>
            <Form.Label>url:</Form.Label>

            <Form.Control
              className='url'
              type='text'
              value={url}
              name='url'

            />
          </div>
          <Button variant='primary' type='submit' id='create'>
          create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

BlogForm.displayName = BlogForm


export default BlogForm