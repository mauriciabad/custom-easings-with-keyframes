import { Point } from '@/types'
import { clamp } from '@/helpers'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export const key: InjectionKey<Store<State>> = Symbol()

export enum Property {
  scale = 'scale',
  translateX = 'translateX',
  translateY = 'translateY',
  translateZ = 'translateZ',
  opacity = 'opacity',
  rotate = 'rotate'
}

export enum ValueUnits {
  none = '',
  '%' = '%',
  px = 'px',
  rem = 'rem',
  em = 'em',
  vh = 'vh',
  vw = 'vw',
  deg = 'deg',
  turn = 'turn',
  rad = 'rad'
}

export type Options = {
  property: Property
  fromValue: number
  toValue: number
  valueUnits: ValueUnits
  duration: number
  easingName: string
  beginingDelay: number
  endDelay: number
}

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
  options: Options
  points: Point[]
  canvasDimensions: CanvasDimensions
}

export const allowedValueUnits: Record<keyof typeof Property, ValueUnits[]> = {
  scale: [ValueUnits.none],
  opacity: [ValueUnits.none, ValueUnits['%']],
  translateX: [
    ValueUnits.px,
    ValueUnits.rem,
    ValueUnits.em,
    ValueUnits.vw,
    ValueUnits.vh,
    ValueUnits['%']
  ],
  translateY: [
    ValueUnits.px,
    ValueUnits.rem,
    ValueUnits.em,
    ValueUnits.vw,
    ValueUnits.vh,
    ValueUnits['%']
  ],
  translateZ: [
    ValueUnits.px,
    ValueUnits.rem,
    ValueUnits.em,
    ValueUnits.vw,
    ValueUnits.vh,
    ValueUnits['%']
  ],
  rotate: [ValueUnits.deg, ValueUnits.turn, ValueUnits.rad]
}

export const valueUnitsDefaultToValue: Record<
  keyof typeof ValueUnits,
  number
> = {
  none: 1,
  '%': 100,
  px: 100,
  rem: 10,
  em: 10,
  vh: 10,
  vw: 10,
  deg: 360,
  turn: 1,
  rad: 6.28319
}

export const store = createStore<State>({
  state: () => ({
    options: {
      property: Property.rotate,
      fromValue: 0,
      toValue: 360,
      valueUnits: ValueUnits.deg,
      duration: 3000,
      easingName: 'ease-custom',
      beginingDelay: 0,
      endDelay: 0
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
      stepX: 0.1
    }
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
    deleteFocusedPoints: state => {
      state.points = state.points.filter(p => !p.isSelected)
    },
    updateOptions: (state, options: Partial<Options>) => {
      if ((options?.fromValue as unknown) === '') options.fromValue = 0
      if ((options?.toValue as unknown) === '') options.toValue = 1
      if ((options?.duration as unknown) === '') options.duration = 1
      if ((options?.beginingDelay as unknown) === '') options.beginingDelay = 0
      if ((options?.endDelay as unknown) === '') options.endDelay = 0

      if (
        options.property &&
        !allowedValueUnits[options.property].includes(
          options.valueUnits ?? state.options.valueUnits
        )
      ) {
        options.valueUnits = allowedValueUnits[options.property][0]
      }

      if (options.valueUnits) {
        options.toValue = valueUnitsDefaultToValue[options.valueUnits || 'none']
      }

      state.options = { ...state.options, ...options }
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
          y: point.y + moveOffset.y
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
    },
    resize: (state, { width, height }: { width: number; height: number }) => {
      state.canvasDimensions.width =
        width - state.canvasDimensions.offset.x - 32
      state.canvasDimensions.height =
        height /
        (state.canvasDimensions.maxY -
          state.canvasDimensions.minY +
          state.canvasDimensions.stepY)
    }
  },
  actions: {}
})
