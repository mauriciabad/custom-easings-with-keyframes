import {
  computePointsWithDelay,
  isTransformProperty,
  Options,
  propertyValue
} from '@/helpers'
import { Point } from '@/types'

export function toKeyframeProperty(point: Point, options: Options): Keyframe {
  if (isTransformProperty(options.property)) {
    return {
      transform: `${options.property}(${propertyValue(point, options)})`
    }
  } else {
    return { [options.property]: propertyValue(point, options) }
  }
}

export function pointToKeyframe(point: Point, options: Options): Keyframe {
  return {
    offset: point.x / 100,
    ...toKeyframeProperty(point, options)
  }
}

export function computeKeyframes(
  points: Point[],
  options: Options
): Keyframe[] {
  return computePointsWithDelay(points, options).map((point) =>
    pointToKeyframe(point, options)
  )
}
