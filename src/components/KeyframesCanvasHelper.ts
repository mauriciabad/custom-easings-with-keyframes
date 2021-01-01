import { Property } from './../store/index'

export function invertCoordenates(x: number) {
  return (x - 1) * -1
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