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
    it('login suceeds with correct credentials', function(){
      cy.get('#username').type('basateer')
      cy.get('#password').type('from')
      cy.contains('login').click()
      cy.contains('wizzy logged in')
    })
  })
})

