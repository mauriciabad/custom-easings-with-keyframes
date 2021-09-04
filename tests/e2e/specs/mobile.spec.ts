describe('Mobile experience', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')

    cy.visit('/')
  })

  it('shows the unsupported device warning', () => {
    cy.contains('The display is too small')
  })

  describe('when the okay button is clicked', () => {
    beforeEach(() => {
      cy.contains('I understant').click()
    })

    it('hides the unsupported device warning', () => {
      cy.contains('The display is too small').should('not.be.exist')
    })
  })
})
