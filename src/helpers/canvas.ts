import { invertCoordenates } from '@/helpers'
import { CanvasDimensions } from '@/store'

export function toCanvasPoint(
  point: Readonly<{ x: number; y: number }>,
  cd: Readonly<CanvasDimensions>
): { x: number; y: number } {
  return {
    x: (point.x / 100) * cd.width,
    y: invertCoordenates(point.y / 100) * cd.height
  }
}
