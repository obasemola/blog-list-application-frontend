describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'basateer',
      name: 'wizzy',
      password: 'from'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3002')
  })


  it('Log in form shows log-in page by default', function() {
    cy.contains('blogs')
    cy.contains('Log in to application')
  })

  describe('logging in', function(){
    beforeEach(function(){
      cy.get('#username').type('basateer')
    })


    it('login suceeds with correct credentials', function(){
      cy.get('#password').type('from')
      cy.get('#login').click()
      cy.contains('wizzy logged in')
      cy.get('#logout').click()
    })

    it('logging in fails with invalid credentals', function(){
      cy.get('#password').type('wrong')
      cy.get('#login').click()
      cy.get('#error')
        .should('contain','Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('when logged in', function(){
    beforeEach(function(){
      cy.get('#username').type('basateer')
      cy.get('#password').type('from')
      cy.get('#login').click()
      cy.get('#dynamic').click()
      cy.get('.title').type('new blog')
      cy.get('.author').type('zig')
      cy.get('.url').type('zig.com')
      cy.get('#create').click()
      cy.get('#view').click()
    })

    it('a blog can be created', function(){
      cy.get('.like').click()
      cy.get('#logout').click()
    })

    it('user can delete', function(){
      cy.contains('wizzy logged in')
      cy.contains('wizzy')
      cy.get('.deleteBlog').click()
      cy.should('not.contain','wizzy')
    })
  })

  describe('if sorted according to likes', function(){
    it.only('is sorted according to likes', function(){
      cy.get('#username').type('basateer')
      cy.get('#password').type('from')
      cy.get('#login').click()
      cy.get('#dynamic').click()
      cy.get('.title').type('new blog')
      cy.get('.author').type('zig')
      cy.get('.url').type('zig.com')
      cy.get('#create').click()
      cy.get('#dynamic').click()
      cy.get('.title').type('new blog2')
      cy.get('.author').type('zig')
      cy.get('.url').type('zig.com')
      cy.get('#create').click()
      cy.get('#dynamic').click()
      cy.get('.title').type('new blog3')
      cy.get('.author').type('zig')
      cy.get('.url').type('zig.com')
      cy.get('#create').click()
      cy.get('#dynamic').click()
      cy.get('.title').type('new blog4')
      cy.get('.author').type('zig')
      cy.get('.url').type('zig.com')
      cy.get('#create').click()
    })
  })

})

