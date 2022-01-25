import { Options, Property, round } from '@/helpers'
import { Point } from '@/types'

export function isTransformProperty(property: Property): boolean {
  return property !== Property.opacity
}

export function propertyValue(
  point: Readonly<Point>,
  options: Readonly<Options>
): string {
  return `${round(
    (options.toValue - options.fromValue) * (point.y / 100) + options.fromValue,
    6
  )}${options.valueUnits}`
}
