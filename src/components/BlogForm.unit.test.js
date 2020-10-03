import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

const newBlog = {
  id: 5,
  title: 'bosenlo',
  author: 'wizza',
  url: 'wiz.com',
  likes: 5
}

describe('BlogForm works as it should', () => {
  test('form receiving correct title props', () => {

    const mockHandler = jest.fn()
    const component = render(
      <BlogForm handlePosts={mockHandler}/>
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('.title')

    fireEvent.change(title, {
      target: { value: newBlog.title }
    })

    fireEvent.submit(form)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('bosenlo')
  })

  test('form receiving correct author props', () => {

    const mockHandler = jest.fn()
    const component = render(
      <BlogForm handlePosts={mockHandler} />
    )

    const form = component.container.querySelector('form')
    const author = component.container.querySelector('.author')

    fireEvent.change(author, {
      target: { value: newBlog.author }
    })

    fireEvent.submit(form)
    expect(mockHandler.mock.calls[0][0].author).toBe('wizza')
  })

  test('form receiving correct url props', () => {

    const mockHandler = jest.fn()
    const component = render(
      <BlogForm handlePosts={mockHandler}/>
    )

    const form = component.container.querySelector('form')
    const url = component.container.querySelector('.url')

    fireEvent.change(url, {
      target: { value: newBlog.url }
    })

    fireEvent.submit(form)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].url).toBe('wiz.com')
  })
})