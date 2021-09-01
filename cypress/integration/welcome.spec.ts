describe('Welcome view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('when it is first visit', () => {
    it('shows welcome dialog', () => {
      cy.contains('Welcome').should('be.visible')
      cy.contains('Easy easings').should('be.visible')
    })

    describe('and clicks get started', () => {
      beforeEach(() => {
        cy.contains('Get started').click()
      })

      it('hides the welcome dialog', () => {
        cy.contains('Welcome').should('not.be.visible')
      })
    })

    describe('when it is not the first visit', () => {
      beforeEach(() => {
        cy.visit('/')
      })

      it("doesn't show the welcome dialog", () => {
        cy.contains('Welcome').should('not.be.exist')
      })
    })
  })
})
