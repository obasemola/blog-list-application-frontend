import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  id: 5,
  title: 'bosenlo',
  author: 'wizza',
  url: 'wiz.com',
  likes: 5
}


describe('should render blog component properly', () => {
  test('should render properties',() => {

    const blog = {
      title: 'bosenlo',
      author: 'wizza',
      url: 'wiz.com',
      likes: 5
    }

    const component = render(
      <Blog blog={blog}/>
    )

    expect(component.container).toHaveTextContent(
      'wiz.com'
    )

    const div = component.container.querySelector('.firstDiv')
    expect(div).toHaveTextContent('bosenlo')
  })

  test('should render only title and author initially', () => {

    const component = render(
      <Blog blog={blog} />
    )

    const div = component.container.querySelector('.secondDiv')

    expect(div).toBeNull()
  })

  test('should display the rest of the information besides author and title', () => {

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} visibleId={5} handleItemClick={mockHandler}/>
    )

    const div = component.container.querySelector('.secondDiv')

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(div).not.toBeNull()

  })

  test('like button should be called twice', () )
})

