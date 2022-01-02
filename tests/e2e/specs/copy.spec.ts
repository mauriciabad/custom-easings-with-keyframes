import dedent from 'dedent'
import { byTestId } from '../support/helpers'
import { clickInCanvas } from '../support/interactions'

function expectToHaveInClipboard(text: string): Cypress.Chainable<unknown> {
  return cy
    .window()
    .its('navigator.clipboard')
    .invoke('readText')
    .should('equal', text)
}

describe('Copy code feature', () => {
  beforeEach(() => {
    // Grant clipboard permissions
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          origin: window.location.origin
        }
      })
    )

    // Open page and check the clipboard permissions
    cy.visit('/')
      .its('navigator.permissions')
      .invoke('query', { name: 'clipboard-read' })
      .its('state')
      .should('equal', 'granted')

    cy.contains('Get started').click()

    cy.get(byTestId('canvas-main-area')).as('canvas')
    cy.contains('Copy code').as('copy-button')
  })

  it('has default code', () => {
    cy.get('@copy-button').click()

    expectToHaveInClipboard(dedent/* css */ `
        .ease-custom {
          animation: ease-custom 3000ms linear;
        }

        @keyframes ease-custom {
          0% {transform: rotate(0deg)}
          100% {transform: rotate(360deg)}
        }`)
  })

  describe('When interacting with the canvas', () => {
    describe('and adds a new point', () => {
      beforeEach(() => {
        clickInCanvas(cy.get('@canvas'), 0.5, 0.25)
      })

      it('adds a new keyframe to the code', () => {
        cy.get('@copy-button').click()

        expectToHaveInClipboard(dedent/* css */ `
          .ease-custom {
            animation: ease-custom 3000ms linear;
          }

          @keyframes ease-custom {
            0% {transform: rotate(0deg)}
            50% {transform: rotate(90deg)}
            100% {transform: rotate(360deg)}
          }`)
      })

      describe('and right clicks on the point', () => {
        beforeEach(() => {
          clickInCanvas(cy.get('@canvas'), 0.5, 0.25, 'right')
        })

        it('removes a keyframe from the code', () => {
          cy.get('@copy-button').click()

          expectToHaveInClipboard(dedent/* css */ `
            .ease-custom {
              animation: ease-custom 3000ms linear;
            }

            @keyframes ease-custom {
              0% {transform: rotate(0deg)}
              100% {transform: rotate(360deg)}
            }`)
        })
      })
    })
  })
})
