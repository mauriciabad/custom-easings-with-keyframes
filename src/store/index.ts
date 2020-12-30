import { Point } from '@/components/Canvas'
import { clamp } from '@/components/KeyframesCanvasHelper'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export const key: InjectionKey<Store<State>> = Symbol()

export type Property =
  | 'scale'
  | 'translateX'
  | 'translateY'
  | 'translateZ'
  | 'opacity'
  | 'rotate'

export type ValueUnits = '' | 'px' | 'em' | 'rem' | '%' | 'deg' | 'turn'

export type Options = {
  property: Property
  fromValue: number
  toValue: number
  valueUnits: ValueUnits
  duration: number
  easingName: string
}

export type State = {
  options: Options
  points: Point[]
}

export const store = createStore<State>({
  state: () => ({
    options: {
      property: 'scale',
      fromValue: 0,
      toValue: 1,
      valueUnits: '',
      duration: 1000,
      easingName: 'ease-custom'
    },
    points: [
      {
        x: 0,
        y: 0,
        isSelected: false
      },
      {
        x: 100,
        y: 100,
        isSelected: false
      }
    ]
  }),
  mutations: {
    createPoint: (state, { x, y }: { x: number; y: number }) => {
      if (state.points.find(p => p.x === x)) return

      state.points.push({
        x,
        y,
        isSelected: false
      })

      state.points.sort((a, b) => a.x - b.x)
    },
    focusPoint: (state, { x }: { x: number }) => {
      state.points = state.points.map(p => ({
        ...p,
        isSelected: p.x === x ? true : p.isSelected
      }))
    },
    blurPoint: (state, { x }: { x: number }) => {
      state.points = state.points.map(p => ({
        ...p,
        isSelected: p.x === x ? false : p.isSelected
      }))
    },
    blurAllPoints: state => {
      state.points = state.points.map(p => ({
        ...p,
        isSelected: false
      }))
    },
    togglePoint: (state, { x }: { x: number }) => {
      state.points = state.points.map(p => ({
        ...p,
        isSelected: p.x === x ? !p.isSelected : p.isSelected
      }))
    },
    moveSelectedPoints: (
      state,
      {
        moveOffset,
        originalPoints
      }: {
        moveOffset: { x: number; y: number }
        originalPoints: Point[]
      }
    ) => {
      const pointsToOverride: Set<number> = new Set()

      state.points = originalPoints.map(point => {
        if (!point.isSelected) return point

        const newPos = {
          x: clamp(point.x + moveOffset.x, 0, 100),
          y: clamp(point.y + moveOffset.y, 0, 100)
        }

        if (originalPoints.find(p => p.x === newPos.x)) {
          pointsToOverride.add(newPos.x)
        }

        return { ...point, ...newPos }
      })

      state.points = state.points.filter(
        point => point.isSelected || !pointsToOverride.has(point.x)
      )

      state.points.sort((a, b) => a.x - b.x)
    }
  },
  actions: {}
})
