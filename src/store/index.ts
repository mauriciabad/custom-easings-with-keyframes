import { clamp } from '@/helpers'
import type { Point } from '@/types'
import type { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export const key: InjectionKey<Store<State>> = Symbol()

export type CanvasDimensions = {
  height: number
  width: number
  offset: { x: number }
  maxY: number
  minY: number
  stepY: number
  maxX: number
  minX: number
  stepX: number
}

export type State = {
  points: Point[]
  canvasDimensions: CanvasDimensions
}

export const store = createStore<State>({
  state: () => ({
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
  }),
  mutations: {
    createPoint: (state, { x, y }: { x: number; y: number }) => {
      if (state.points.find((p) => p.x === x)) return

      state.points.push({
        x,
        y,
        isSelected: false,
      })

      state.points.sort((a, b) => a.x - b.x)
    },
    deleteFocusedPoints: (state) => {
      if (state.points.length <= 1) return
      state.points = state.points.filter((p) => !p.isSelected)
    },
    focusPoint: (state, { x }: { x: number }) => {
      state.points = state.points.map((p) => ({
        ...p,
        isSelected: p.x === x ? true : p.isSelected,
      }))
    },
    blurPoint: (state, { x }: { x: number }) => {
      state.points = state.points.map((p) => ({
        ...p,
        isSelected: p.x === x ? false : p.isSelected,
      }))
    },
    blurAllPoints: (state) => {
      state.points = state.points.map((p) => ({
        ...p,
        isSelected: false,
      }))
    },
    togglePoint: (state, { x }: { x: number }) => {
      state.points = state.points.map((p) => ({
        ...p,
        isSelected: p.x === x ? !p.isSelected : p.isSelected,
      }))
    },
    moveSelectedPoints: (
      state,
      {
        moveOffset,
        originalPoints,
      }: {
        moveOffset: { x: number; y: number }
        originalPoints: Point[]
      }
    ) => {
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
    },
    resize: (state, { width, height }: { width: number; height: number }) => {
      state.canvasDimensions.width =
        width - state.canvasDimensions.offset.x - 32
      state.canvasDimensions.height =
        height /
        (state.canvasDimensions.maxY -
          state.canvasDimensions.minY +
          state.canvasDimensions.stepY)
    },
  },
  actions: {},
})
