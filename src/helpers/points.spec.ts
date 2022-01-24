import { Point } from '@/types'
import { computeGroupedPoints, GroupedPoints } from '.'

describe('computeGroupedPoints', () => {
  it.each([[[], []]] as [Point[], GroupedPoints[]][])(
    'computeGroupedPoints of %p returns %p',
    (input, output) => {
      expect(computeGroupedPoints(input)).toEqual(output)
    }
  )
})
