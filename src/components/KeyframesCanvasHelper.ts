import { Property } from './../store/index'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/components/KeyframesCanvas.vue'

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

export function toCanvasPointX(x: number) {
  return (x / 100) * CANVAS_WIDTH
}

export function toCanvasPointY(y: number) {
  return invertCoordenates(y / 100) * CANVAS_HEIGHT
}

export function toCanvasPoint(point: { x: number; y: number }) {
  return {
    x: toCanvasPointX(point.x),
    y: toCanvasPointY(point.y)
  }
}
