import dedent from 'dedent'

/**
 * Cliks in the canvas at the specified coordenates
 * @param canvas Canvas to click in
 * @param x From 0 to 1
 * @param y From 0 to 1
 */
export function clickInCanvas(
  canvas: Cypress.Chainable<JQuery<HTMLElement>>,
  x: number,
  y: number,
  clickType: 'left' | 'right' = 'left'
) {
  return canvas.then(element => {
    const canvasBox = element[0].getBoundingClientRect()
    const canvasClickPoints = {
      x: x * canvasBox.width,
      y: canvasBox.height - y * canvasBox.height
    }

    switch (clickType) {
      case 'right':
        return canvas.rightclick(canvasClickPoints.x, canvasClickPoints.y, {
          force: true
        })

      case 'left':
      default:
        return canvas.click(canvasClickPoints.x, canvasClickPoints.y, {
          force: true
        })
    }
  })
}

describe('Easy easings', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)

    cy.visit('/')

    cy.contains('Get started').click()

    cy.get('[data-test-id="canvas-main-area"]').as('canvas')
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

  describe('and adds a new point', () => {
    beforeEach(() => {
      clickInCanvas(cy.get('@canvas'), 0.5, 0.25)
    })

    it('adds a new keyframe to the code', () => {
      cy.get('pre').contains(dedent/* css */ `
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
  })
})
