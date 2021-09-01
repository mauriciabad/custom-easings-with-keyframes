import dedent from 'dedent'

const vh = 768
const vw = 1024

describe('Easy easings', () => {
  beforeEach(() => {
    cy.viewport(vw, vh)

    cy.visit('/')

    cy.contains('Get started').click()
  })

  it('has default code', () => {
    cy.get('pre').contains(dedent/* css */ `
      .ease-custom {
        animation: ease-custom 3000ms linear;
      }

      @keyframes ease-custom {
        0% {transform: rotate(0deg)}
        100% {transform: rotate(360deg)}
      }`)
  })
})
