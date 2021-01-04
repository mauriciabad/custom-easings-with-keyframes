<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Point } from '@/types'
import { toCanvasPoint } from '@/helpers'
import { useStore } from 'vuex'
import { key } from '@/store'

export default defineComponent({
  props: { points: { type: Object as () => Point[], required: true } },

  setup(props) {
    const store = useStore(key)
    const cd = computed(() => store.state.canvasDimensions)

    const pointsInCanvas = computed(() =>
      props.points.map(point => toCanvasPoint(point, cd.value))
    )

    const path = computed(() =>
      pointsInCanvas.value.reduce((total, { x, y }) => {
        return total ? `${total}L${x} ${y}` : `M${x} ${y}`
      }, '')
    )

    return { path, pointsInCanvas, cd }
  }
})
</script>

<template>
  <g>
    <defs>
      <mask id="line-mask">
        <rect
          :x="`${(cd.offset.x / cd.width) * -1 * 100}%`"
          :y="`${(cd.maxY - 1 + cd.stepY / 2 + 32 / cd.height) * -1 * 100}%`"
          :width="`${100 + ((32 + cd.offset.x) / cd.width) * 100}%`"
          :height="`${(cd.maxY - cd.minY + cd.stepY + 64 / cd.height) * 100}%`"
          fill="white"
        />
        <circle
          v-for="point in pointsInCanvas"
          :key="point.x"
          r="8"
          :cx="point.x"
          :cy="point.y"
          fill="black"
        />
      </mask>
    </defs>

    <path :d="path" mask="url(#line-mask)" class="path" />
  </g>
</template>

<style scoped lang="scss">
.path {
  stroke: url(#line-gradient);
  stroke-width: 5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
