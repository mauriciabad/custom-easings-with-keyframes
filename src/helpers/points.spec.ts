import { Point } from '@/types'
import { computeGroupedPoints, GroupedPoints } from '.'

describe('computeGroupedPoints', () => {
  it.each([
    ['Empty', [], []],
    [
      'Base case',
      [
        [0, 0],
        [100, 100]
      ],
      [
        { xs: [0], y: 0 },
        { xs: [100], y: 100 }
      ]
    ],
    [
      'Not sorted',
      [
        [100, 100],
        [0, 0]
      ],
      [
        { xs: [0], y: 0 },
        { xs: [100], y: 100 }
      ]
    ],
    [
      'Not ending at 100%',
      [
        [0, 0],
        [50, 50]
      ],
      [
        { xs: [0], y: 0 },
        { xs: [50], y: 50 }
      ]
    ],
    [
      'Not beginning at 0%',
      [
        [50, 50],
        [100, 100]
      ],
      [
        { xs: [50], y: 50 },
        { xs: [100], y: 100 }
      ]
    ],
    [
      'Not beginning nor ending at 0% and 100',
      [
        [10, 10],
        [90, 90]
      ],
      [
        { xs: [10], y: 10 },
        { xs: [90], y: 90 }
      ]
    ],
    ['Single point', [[10, 50]], [{ xs: [10], y: 50 }]],
    [
      'Duplicated point',
      [
        [10, 50],
        [10, 50]
      ],
      [{ xs: [10], y: 50 }]
    ],
    [
      '2 points with same y',
      [
        [10, 50],
        [20, 50]
      ],
      [{ xs: [10, 20], y: 50 }]
    ],
    [
      '3 points with same y',
      [
        [10, 50],
        [20, 50],
        [30, 50]
      ],
      [{ xs: [10, 30], y: 50 }]
    ],
    [
      '4 points with same y',
      [
        [10, 50],
        [20, 50],
        [30, 50],
        [40, 50]
      ],
      [{ xs: [10, 40], y: 50 }]
    ],
    [
      'Non consecutive points with same y',
      [
        [10, 50],
        [20, 50],
        [30, 50],
        [40, 100],
        [50, 50],
        [60, 50],
        [70, 50],
        [80, 100]
      ],
      [
        { xs: [10, 30], y: 50 },
        { xs: [40], y: 100 },
        { xs: [50, 70], y: 50 },
        { xs: [80], y: 100 }
      ]
    ]
  ] as [string, [number, number][], GroupedPoints[]][])(
    'Test #%#: %s',
    (testTitle, simplifiedInput, output) => {
      const input: Point[] = simplifiedInput.map(([x, y]) => ({
        x,
        y,
        isSelected: false
      }))

      expect(computeGroupedPoints(input)).toEqual(output)
    }
  )
})
