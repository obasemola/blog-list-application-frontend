import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'


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

    const blog = {
      title: 'bosenlo',
      author: 'wizza',
      url: 'wiz.com',
      likes: 5
    }

    const component = render(
      <Blog blog={blog} />
    )

    component.debug()

    const div = component.container.querySelector('.secondDiv')

    expect(div).toHaveStyle('display: none')
  })
})

