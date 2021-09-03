import dedent from 'dedent'

/**
 * Cliks in the canvas at the specified coordenates
 * @param canvas Canvas to click in
 * @param x From 0 to 1
 * @param y From 0 to 1
 */
function clickInCanvas(
  canvas: Cypress.Chainable<JQuery<HTMLElement>>,
  x: number,
  y: number,
  clickType: 'left' | 'right' | 'hover' = 'left',
  options: Partial<Cypress.ClickOptions> = {}
) {
  return canvas.then((element) => {
    const canvasBox = element[0].getBoundingClientRect()
    const canvasClickPoints = {
      x: x * canvasBox.width,
      y: canvasBox.height - y * canvasBox.height
    }

    switch (clickType) {
      case 'right':
        return canvas.rightclick(canvasClickPoints.x, canvasClickPoints.y, {
          force: true,
          ...options
        })

      case 'hover':
        return canvas.trigger(
          'mouseover',
          canvasClickPoints.x,
          canvasClickPoints.y,
          {
            force: true,
            ...options
          }
        )

      case 'left':
      default:
        return canvas.click(canvasClickPoints.x, canvasClickPoints.y, {
          force: true,
          ...options
        })
    }
  })
}

function expectCodeToBeTheInitialState(
  code: Cypress.Chainable<JQuery<HTMLElement>>
) {
  return code.contains(dedent/* css */ `
      .ease-custom {
        animation: ease-custom 3000ms linear;
      }

      @keyframes ease-custom {
        0% {transform: rotate(0deg)}
        100% {transform: rotate(360deg)}
      }`)
}

describe('Canvas element', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.contains('Get started').click()

    cy.get('[data-test-id="canvas-main-area"]').as('canvas')
    cy.get('pre').as('code')
  })

  it('has default code', () => {
    expectCodeToBeTheInitialState(cy.get('@code'))
  })

  it("doesn't allow to create points over 100% in the x axis", () => {
    clickInCanvas(cy.get('@canvas'), 1.01, 0.5)
    expectCodeToBeTheInitialState(cy.get('@code'))
  })

  it("doesn't allow to create points below 0% in the x axis", () => {
    clickInCanvas(cy.get('@canvas'), -0.01, 0.5)
    expectCodeToBeTheInitialState(cy.get('@code'))
  })

  it('allows to create points over 100% in the y axis', () => {
    clickInCanvas(cy.get('@canvas'), 0.5, 1.25)
    cy.get('@code').contains(dedent/* css */ `
      .ease-custom {
        animation: ease-custom 3000ms linear;
      }

      @keyframes ease-custom {
        0% {transform: rotate(0deg)}
        50% {transform: rotate(450deg)}
        100% {transform: rotate(360deg)}
      }`)
  })

  it('allows to create points below 0% in the y axis', () => {
    clickInCanvas(cy.get('@canvas'), 0.5, -0.25)
    cy.get('@code').contains(dedent/* css */ `
      .ease-custom {
        animation: ease-custom 3000ms linear;
      }

      @keyframes ease-custom {
        0% {transform: rotate(0deg)}
        50% {transform: rotate(-90deg)}
        100% {transform: rotate(360deg)}
      }`)
  })

  describe('and adds a new point', () => {
    beforeEach(() => {
      clickInCanvas(cy.get('@canvas'), 0.5, 0.25)
    })

    it('adds a new keyframe to the code', () => {
      cy.get('@code').contains(dedent/* css */ `
      .ease-custom {
        animation: ease-custom 3000ms linear;
      }

      @keyframes ease-custom {
        0% {transform: rotate(0deg)}
        50% {transform: rotate(90deg)}
        100% {transform: rotate(360deg)}
      }`)
    })

    describe('and adds another point holding shift', () => {
      beforeEach(() => {
        clickInCanvas(cy.get('@canvas'), 0.75, 0.5, 'left', {
          shiftKey: true
        })
      })

      it('adds a new keyframe to the code', () => {
        cy.get('@code').contains(dedent/* css */ `
      .ease-custom {
        animation: ease-custom 3000ms linear;
      }

      @keyframes ease-custom {
        0% {transform: rotate(0deg)}
        50% {transform: rotate(90deg)}
        75% {transform: rotate(180deg)}
        100% {transform: rotate(360deg)}
      }`)
      })

      describe('and clicks the delete key', () => {
        beforeEach(() => {
          cy.get('@canvas').trigger('keydown', {
            key: 'Backspace',
            force: true
          })
        })

        it('removes the 2 keyframes from the code', () => {
          expectCodeToBeTheInitialState(cy.get('@code'))
        })
      })
    })

    describe('and adds another point', () => {
      beforeEach(() => {
        clickInCanvas(cy.get('@canvas'), 0.75, 0.5)
      })

      it('adds a new keyframe to the code', () => {
        cy.get('@code').contains(dedent/* css */ `
      .ease-custom {
        animation: ease-custom 3000ms linear;
      }

      @keyframes ease-custom {
        0% {transform: rotate(0deg)}
        50% {transform: rotate(90deg)}
        75% {transform: rotate(180deg)}
        100% {transform: rotate(360deg)}
      }`)
      })

      describe('and selects the first point', () => {
        beforeEach(() => {
          clickInCanvas(cy.get('@canvas'), 0.5, 0.25, 'left', {
            shiftKey: true
          })
        })

        describe('and clicks the delete key', () => {
          beforeEach(() => {
            cy.get('@canvas').trigger('keydown', {
              key: 'Backspace',
              force: true
            })
          })

          it('removes the 2 keyframes from the code', () => {
            expectCodeToBeTheInitialState(cy.get('@code'))
          })
        })

        describe('and does a right click', () => {
          beforeEach(() => {
            clickInCanvas(cy.get('@canvas'), 0.75, 0.5, 'right')
          })

          it('removes the 2 keyframes from the code', () => {
            expectCodeToBeTheInitialState(cy.get('@code'))
          })
        })
      })
    })

    describe('and right clicks on the point', () => {
      beforeEach(() => {
        clickInCanvas(cy.get('@canvas'), 0.5, 0.25, 'right')
      })

      it('removes a keyframe from the code', () => {
        expectCodeToBeTheInitialState(cy.get('@code'))
      })
    })
  })
})
