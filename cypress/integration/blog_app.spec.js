describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3002')
  })


  it('front page shows log-in page by default', function() {
    cy.contains('blogs')
    cy.contains('Log in to application')
  })
})

