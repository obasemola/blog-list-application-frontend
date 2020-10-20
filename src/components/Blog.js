import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import '../App.css'


const Blog = ({ blogs })  => {


  // const blogStyle = {
  //   display: flex
  // }

  return (
    <div>
      <Table striped className='table table-dark'>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td className='blogStyle'>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )

}
export default Blog
