<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Point } from '@/types'
import { useStore } from 'vuex'
import { key } from '@/store'
import { toCanvasPoint } from '@/helpers'

export default defineComponent({
  props: {
    points: { type: Object as () => { x: number; y: number }[], required: true }
  },

  setup(props) {
    const store = useStore(key)
    const cd = computed(() => store.state.canvasDimensions)

    const pointsInCanvas = computed(() =>
      props.points.map(point => toCanvasPoint(point, cd.value))
    )

    return { cd, pointsInCanvas }
  }
})
</script>

<template>
  <mask>
    <rect
      :x="`${(cd.offset.x / cd.width) * -1 * 100}%`"
      :y="`${(cd.maxY - 1 + cd.stepY / 2 + 32 / cd.height) * -1 * 100}%`"
      :width="`${100 + ((32 + cd.offset.x) / cd.width) * 100}%`"
      :height="`${(cd.maxY - cd.minY + cd.stepY + 64 / cd.height) * 100}%`"
      fill="white"
    />
    <circle
      v-for="point in pointsInCanvas"
      :key="`${point.x},${point.y}`"
      r="8"
      :cx="point.x"
      :cy="point.y"
      fill="black"
    />
  </mask>
</template>
