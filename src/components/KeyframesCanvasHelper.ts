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
