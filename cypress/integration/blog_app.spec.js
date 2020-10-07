const { default: blogs } = require('../../src/services/blogs')

describe('is sorted according to number of likes', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'basateer',
      name: 'wizzy',
      password: 'from'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'basateer', password: 'from'
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3002')
    })

    cy.createBlog({
      title: 'kiniuu',
      author: 'wizzy',
      url: 'kiniiuu.org',
      likes: 6
    })
    cy.createBlog({
      title: 'kini',
      author: 'wizzy',
      url: 'kiniiuu.org',
      likes: 7
    })
    cy.createBlog({
      title: 'kiniuaaaeeu',
      author: 'wizzy',
      url: 'kiniiuu.org',
      likes: 8
    })
    cy.createBlog({
      title: 'kiniujhbkjknu',
      author: 'wizzy',
      url: 'kiniiuu.org',
      likes: 10
    })

  })

  it('Log in form shows log-in page by default', function() {
    cy.contains('blogs')
    cy.contains('Log in to application')
  })


  it('blogs are arranged according to number of likes', function(){
    cy.get('#username').type('basateer')
    cy.get('#password').type('from')
    cy.get('#login').click()
    // cy.get('Button').then(btns => {
    //   cy.log(btns)
    // })

    // cy.get('.mainDiv')
    //       .find('')
    //       .each(function(buttons){
    //        var ourButtons=buttons.text()
    //        cy.log("names:", ourButtons);

    // cy.get('#num_of_likes').each(likes => {
    //     const like = []
    //     const like1 = likes.get(0).innerText
    //     like.push(like1)
    //     // cy.get('#hide').click()
    //     cy.log(like)
    //   })





    // cy.get('#view').click({ multiple: true })
    //   .get('#num_of_likes').then(likes => {
    //     const likes1 = likes.get(0).innerText
    //     cy.log(likes1)
    //     // expect(likes[0].innerText).to.eq('10')
    //     .get('#hide').click()
    //   })
    // .get('#view').click({ multiple: true })
    //   .get('#num_of_likes').then(likes => {
    //   const likes2 = likes.get(1).innerText
    //   cy.log(likes2)
    //     // expect(likes[0].innerText).to.eq('10')
    // })



    // cy.get('#num_of_likes').then(likes => {
    //   expect(likes[0].innerText).to.eq('10')
    // })


  })

})


// describe('Blog app', function() {
//   beforeEach(function(){
//     cy.request('POST', 'http://localhost:3003/api/testing/reset')
//     const user = {
//       username: 'basateer',
//       name: 'wizzy',
//       password: 'from'
//     }
//     cy.request('POST', 'http://localhost:3003/api/users', user)
//     cy.visit('http://localhost:3002')
//   })


//   it('Log in form shows log-in page by default', function() {
//     cy.contains('blogs')
//     cy.contains('Log in to application')
//   })

//   describe('logging in', function(){
//     beforeEach(function(){
//       cy.get('#username').type('basateer')
//     })


//     it('login suceeds with correct credentials', function(){
//       cy.get('#password').type('from')
//       cy.get('#login').click()
//       cy.contains('wizzy logged in')
//       cy.get('#logout').click()
//     })

//     it('logging in fails with invalid credentals', function(){
//       cy.get('#password').type('wrong')
//       cy.get('#login').click()
//       cy.get('#error')
//         .should('contain','Wrong username or password')
//         .and('have.css', 'color', 'rgb(255, 0, 0)')
//         .and('have.css', 'border-style', 'solid')
//     })
//   })

//   describe('when logged in', function(){
//     it('a blog can be liked', function(){
//       cy.get('#username').type('basateer')
//       cy.get('#password').type('from')
//       cy.get('#login').click()
//       cy.get('#dynamic').click()
//       cy.get('.title').type('new blog')
//       cy.get('.author').type('zig')
//       cy.get('.url').type('zig.com')
//       cy.get('#create').click()
//       cy.get('#view').click()
//       cy.get('.like').click()
//       cy.get('#logout').click()
//     })

//   })

//   describe('user can delete', function() {
//     it('user can delete', function(){
//       cy.get('#username').type('basateer')
//       cy.get('#password').type('from')
//       cy.get('#login').click()
//       cy.get('#dynamic').click()
//       cy.get('.title').type('new blog')
//       cy.get('.author').type('zig')
//       cy.get('.url').type('zig.com')
//       cy.get('#create').click()
//       cy.get('#view').click()
//       cy.contains('wizzy logged in')
//       cy.get('.deleteBlog').click()
//       cy.get('#logout').click()
//     })
//   })

// })