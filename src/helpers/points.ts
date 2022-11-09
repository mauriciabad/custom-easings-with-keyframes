import { type Options, round } from '@/helpers'
import type { Point } from '@/types'

export function calculateOffset(x: number, options: Readonly<Options>): number {
  const totalTime = options.beginingDelay + options.duration + options.endDelay

  return round(
    100 *
      (options.beginingDelay / totalTime +
        (x / 100) * (options.duration / totalTime)),
    6
  )
}

export function computePointsWithDelay(
  points: Readonly<Point[]>,
  options: Readonly<Options>
): Point[] {
  const pointsWithDelay = [
    ...(options.beginingDelay
      ? [
          {
            x: 0,
            y: points[0].y,
            isSelected: false,
          },
          {
            x: calculateOffset(0, options) - 1e-6,
            y: points[0].y,
            isSelected: false,
          },
        ]
      : []),

    ...points.map((point) => ({
      ...point,
      x: calculateOffset(point.x, options),
    })),

    ...(options.endDelay
      ? [
          {
            x: calculateOffset(points[points.length - 1].x, options) + 1e-6,
            y: points[points.length - 1].y,
            isSelected: false,
          },
          {
            x: 100,
            y: points[points.length - 1].y,
            isSelected: false,
          },
        ]
      : []),
  ]

  const pointsCount: { [x: number]: number[] } = {}
  for (const point of pointsWithDelay) {
    if (!pointsCount[point.x]) pointsCount[point.x] = []
    pointsCount[point.x].push(point.y)
  }

  return Object.entries(pointsCount)
    .map(([x, ys]) => [Number(x), ys] as [number, number[]])
    .sort((a, b) => a[0] - b[0])
    .map(([x, ys], i, array) => {
      return {
        x: x,
        y:
          i === 0
            ? ys[0]
            : i === array.length - 1
            ? ys[ys.length - 1]
            : ys.reduce((sum, val) => sum + val, 0) / ys.length,
        isSelected: false,
      } as Point
    })
}

export interface GroupedPoints {
  xs: number[]
  y: number
}

export function computeGroupedPoints(
  points: Readonly<Point[]>
): GroupedPoints[] {
  const sortedPoints = [...points].sort((a, b) => a.x - b.x)
  const result: GroupedPoints[] = []

  for (const point of sortedPoints) {
    const lastGroup: GroupedPoints | undefined = result[result.length - 1]

    if (lastGroup && lastGroup.y === point.y) {
      lastGroup.xs[1] = point.x
    } else {
      result.push({ xs: [point.x], y: point.y })
    }
  }

  return result
}

export function getSorroundingPoints(
  x: number,
  points: Readonly<Point[]>
): [Point | undefined, Point | undefined] {
  if (x <= points[0].x) {
    return [points[0], undefined]
  }
  if (x >= points[points.length - 1].x) {
    return [undefined, points[points.length - 1]]
  }

  for (let i = 0; i < points.length - 1; i++) {
    const leftPoint = points[i]
    const rightPoint = points[i + 1] || leftPoint

    if (leftPoint.x <= x && rightPoint.x >= x) {
      return [leftPoint, rightPoint]
    }
  }

  return [undefined, undefined]
}

// Workarround to asign objects without losing vue reactivity
export const assign = <T>(
  oldValue: T,
  newValue: Readonly<Partial<T>>
): void => {
  for (const key in oldValue) {
    delete oldValue[key]
  }

  for (const keyAsString in newValue) {
    const key = keyAsString as keyof T

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(oldValue as any)[key] = newValue[key]
  }
}
