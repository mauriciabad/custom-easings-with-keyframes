import { CanvasDimensions, Options } from './../store/index'
import { Property } from '../store/index'
import { Point } from '@/types'

export function invertCoordenates(x: number) {
  return (x - 1) * -1
}

export function round(value: number, decimals: number) {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
}

export function isTransformProperty(property: Property) {
  return [
    'translate',
    'translateX',
    'translateY',
    'translateZ',
    'rotate',
    'scale'
  ].includes(property)
}

export function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num
}

export function toCanvasPoint(
  point: { x: number; y: number },
  cd: CanvasDimensions
) {
  return {
    x: (point.x / 100) * cd.width,
    y: invertCoordenates(point.y / 100) * cd.height
  }
}

export function propertyValue(point: Point, options: Options) {
  return `${round(
    (options.toValue - options.fromValue) * (point.y / 100) + options.fromValue,
    6
  )}${options.valueUnits}`
}

export function calculateOffset(x: number, options: Options) {
  const totalTime = options.beginingDelay + options.duration + options.endDelay

  return round(
    100 *
      (options.beginingDelay / totalTime +
        (x / 100) * (options.duration / totalTime)),
    6
  )
}

export function toKeyframeProperty(point: Point, options: Options) {
  if (isTransformProperty(options.property)) {
    return {
      transform: `${options.property}(${propertyValue(point, options)})`
    }
  } else {
    return { [options.property]: propertyValue(point, options) }
  }
}

export function pointToKeyframe(point: Point, options: Options) {
  return {
    offset: point.x / 100,
    ...toKeyframeProperty(point, options)
  }
}

export function computePointsWithDelay(points: Point[], options: Options) {
  const pointsWithDelay = [
    ...(options.beginingDelay
      ? [
          {
            x: 0,
            y: points[0].y,
            isSelected: false
          },
          {
            x: calculateOffset(0, options) - 1e-6,
            y: points[0].y,
            isSelected: false
          }
        ]
      : []),

    ...points.map(point => ({
      ...point,
      x: calculateOffset(point.x, options)
    })),

    ...(options.endDelay
      ? [
          {
            x: calculateOffset(points[points.length - 1].x, options) + 1e-6,
            y: points[points.length - 1].y,
            isSelected: false
          },
          {
            x: 100,
            y: points[points.length - 1].y,
            isSelected: false
          }
        ]
      : [])
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
        isSelected: false
      } as Point
    })
}

export function computeKeyframes(
  points: Point[],
  options: Options
): Keyframe[] {
  return computePointsWithDelay(points, options).map(point =>
    pointToKeyframe(point, options)
  )
}
