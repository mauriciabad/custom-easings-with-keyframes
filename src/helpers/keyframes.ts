import {
  computePointsWithDelay,
  isTransformProperty,
  type Options,
  propertyValue,
} from '@/helpers'
import type { Point } from '@/types'

export function toKeyframeProperty(
  point: Readonly<Point>,
  options: Readonly<Options>
): Keyframe {
  if (isTransformProperty(options.property)) {
    return {
      transform: `${options.property}(${propertyValue(point, options)})`,
    }
  } else {
    return { [options.property]: propertyValue(point, options) }
  }
}

export function pointToKeyframe(
  point: Readonly<Point>,
  options: Readonly<Options>
): Keyframe {
  return {
    offset: point.x / 100,
    ...toKeyframeProperty(point, options),
  }
}

export function computeKeyframes(
  points: Readonly<Point[]>,
  options: Readonly<Options>
): Keyframe[] {
  return computePointsWithDelay(points, options).map((point) =>
    pointToKeyframe(point, options)
  )
}
