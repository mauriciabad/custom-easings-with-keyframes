import { Point } from '@/components/Canvas'
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
    selectPoint: (state, { x }: { x: number }) => {
      state.points = state.points.map(p => ({ ...p, isSelected: p.x === x }))
    }
  },
  actions: {}
})
