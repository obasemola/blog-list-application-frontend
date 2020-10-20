import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { addComment } from '../reducers/blogReducer'


const BlogExpanded = ({ blogs, usersInfo, handleLikes }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const usersBlog = usersInfo.find(userInfo => userInfo.userBlogs.find(user => user.id === id))


  if(!blog || !usersBlog){
    return null
  }

  const getId = () => {
    return Math.random() * 10000
  }

  const submitComment = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    const blog = blogs.find(blog => blog.id === id)
    const newBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    e.target.comment.value = ''
    const data = await blogService.update(id, newBlog)
    dispatch(addComment(id, comment))

    console.log(blog.comments)
    console.log(data)
  }
  const comments = blog.comments.map(comment => comment)
  console.log(blog.comments)

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href="https://example.com">blog link</a>
      <div id='likes'>
        <span id='num_of_likes'>{blog.likes}</span> likes
        <button className='like' id={blog.id} onClick={handleLikes}>like</button>
      </div>
      <p>added by {usersBlog.userName}</p>
      <h3>Comments</h3>
      <Togglable buttonLabel='comment'>
        <form onSubmit={submitComment}>
          <textarea name='comment'/>
          <button type='submit'>comment</button>
        </form>
      </Togglable>
      {comments.map((comment) => <p key ={getId()}>{comment}</p>)}
    </div>
  )
}

export default BlogExpanded