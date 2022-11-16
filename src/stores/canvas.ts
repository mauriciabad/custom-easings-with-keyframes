import { reactive, readonly } from 'vue'
import { defineStore } from 'pinia'
import type { Point } from '@/types'
import { clamp } from '@/helpers'

export type CanvasDimensions = {
  height: number
  width: number
  offset: { x: number; y: number }
  maxY: number
  minY: number
  stepY: number
  maxX: number
  minX: number
  stepX: number
}

type State = {
  points: Point[]
  canvasDimensions: CanvasDimensions
}

export const useCanvasStore = defineStore('canvas', () => {
  const state = reactive<State>({
    points: [
      {
        x: 0,
        y: 0,
        isSelected: false,
      },
      {
        x: 100,
        y: 100,
        isSelected: false,
      },
    ],
    canvasDimensions: {
      height: 800,
      width: 800,
      offset: { x: 40, y: 0 },
      maxY: 1.3,
      minY: -0.3,
      stepY: 0.1,
      maxX: 1,
      minX: 0,
      stepX: 0.1,
    },
  })

  function createPoint({ x, y }: { x: number; y: number }): void {
    if (state.points.find((p) => p.x === x)) return

    state.points.push({
      x,
      y,
      isSelected: false,
    })

    state.points.sort((a, b) => a.x - b.x)
  }
  function deleteFocusedPoints(): void {
    if (state.points.length <= 1) return
    state.points = state.points.filter((p) => !p.isSelected)
  }
  function focusPoint({ x }: { x: number }): void {
    state.points = state.points.map((p) => ({
      ...p,
      isSelected: p.x === x ? true : p.isSelected,
    }))
  }
  function blurPoint({ x }: { x: number }): void {
    state.points = state.points.map((p) => ({
      ...p,
      isSelected: p.x === x ? false : p.isSelected,
    }))
  }
  function blurAllPoints(): void {
    state.points = state.points.map((p) => ({
      ...p,
      isSelected: false,
    }))
  }
  function togglePoint({ x }: { x: number }): void {
    state.points = state.points.map((p) => ({
      ...p,
      isSelected: p.x === x ? !p.isSelected : p.isSelected,
    }))
  }
  function moveSelectedPoints({
    moveOffset,
    originalPoints,
  }: {
    moveOffset: { x: number; y: number }
    originalPoints: readonly Point[]
  }): void {
    const pointsToOverride: Set<number> = new Set()

    state.points = originalPoints.map((point) => {
      if (!point.isSelected) return point

      const newPos = {
        x: clamp(point.x + moveOffset.x, 0, 100),
        y: point.y + moveOffset.y,
      }

      if (originalPoints.find((p) => p.x === newPos.x)) {
        pointsToOverride.add(newPos.x)
      }

      return { ...point, ...newPos }
    })

    state.points = state.points.filter(
      (point) => point.isSelected || !pointsToOverride.has(point.x)
    )

    state.points.sort((a, b) => a.x - b.x)
  }
  function resize({ width, height }: { width: number; height: number }): void {
    state.canvasDimensions.width = width - state.canvasDimensions.offset.x - 32
    state.canvasDimensions.height =
      height /
      (state.canvasDimensions.maxY -
        state.canvasDimensions.minY +
        state.canvasDimensions.stepY)
  }

  return {
    points: readonly(state.points),
    canvasDimensions: readonly(state.canvasDimensions),

    createPoint,
    deleteFocusedPoints,
    focusPoint,
    blurPoint,
    blurAllPoints,
    togglePoint,
    moveSelectedPoints,
    resize,
  }
})
