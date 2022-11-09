describe('PWA', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.contains('Get started').click()
  })

  describe('when it is first visit', () => {
    it("doesn't show the update banner", () => {
      cy.contains('New version available!').should('not.be.exist')
    })
  })
})
