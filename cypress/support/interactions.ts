/// <reference types="cypress" />
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
  clickType: 'left' | 'right' | 'hover' = 'left',
  options: Partial<Cypress.ClickOptions> = {}
): Cypress.Chainable<JQuery<HTMLElement>> {
  return canvas.then((element) => {
    const canvasBox = element[0].getBoundingClientRect()
    const canvasClickPoints = {
      x: x * canvasBox.width,
      y: canvasBox.height - y * canvasBox.height,
    }

    switch (clickType) {
      case 'right':
        return canvas.rightclick(canvasClickPoints.x, canvasClickPoints.y, {
          force: true,
          ...options,
        })

      case 'hover':
        return canvas.trigger(
          'mouseover',
          canvasClickPoints.x,
          canvasClickPoints.y,
          {
            force: true,
            ...options,
          }
        )

      case 'left':
      default:
        return canvas.click(canvasClickPoints.x, canvasClickPoints.y, {
          force: true,
          ...options,
        })
    }
  })
}
