<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getSorroundingPoints, toCanvasPoint } from '@/helpers'
import { useStore } from 'vuex'
import { key } from '@/store'
import KeyframesCanvasPointsMask from './KeyframesCanvasPointsMask.vue'
import KeyframesCanvasPoint from './KeyframesCanvasPoint.vue'

export default defineComponent({
  components: { KeyframesCanvasPointsMask, KeyframesCanvasPoint },
  props: {
    point: { type: Object as () => { x: number; y: number }, required: true }
  },

  setup(props) {
    const store = useStore(key)
    const cd = computed(() => store.state.canvasDimensions)
    const points = computed(() => store.state.points)

    const pointAlreadyExists = computed(
      () => !points.value.find(p => p.x === props.point.x)
    )

    const sorroundingPoints = computed(() => {
      return getSorroundingPoints(props.point.x, points.value)
    })

    const path = computed(() => {
      const leftPoint = sorroundingPoints.value[0]
        ? toCanvasPoint(sorroundingPoints.value[0], cd.value)
        : undefined
      const rightPoint = sorroundingPoints.value[1]
        ? toCanvasPoint(sorroundingPoints.value[1], cd.value)
        : undefined
      const centerPoint = toCanvasPoint(props.point, cd.value)

      if (!leftPoint && rightPoint) {
        return `M${centerPoint.x} ${centerPoint.y}L${rightPoint.x} ${rightPoint.y}`
      }
      if (leftPoint && !rightPoint) {
        return `M${leftPoint.x} ${leftPoint.y}L${centerPoint.x} ${centerPoint.y}`
      }
      if (leftPoint && rightPoint) {
        return `M${leftPoint.x} ${leftPoint.y}L${centerPoint.x} ${centerPoint.y}L${rightPoint.x} ${rightPoint.y}`
      }
      return ''
    })

    return { path, sorroundingPoints, pointAlreadyExists }
  }
})
</script>

<template>
  <g class="new-point" v-if="pointAlreadyExists">
    <defs>
      <keyframes-canvas-points-mask
        id="new-point-mask"
        :points="[point, ...sorroundingPoints.filter(p => p !== undefined)]"
      />
    </defs>

    <path :d="path" mask="url(#new-point-mask)" class="path" />
    <keyframes-canvas-point :point="point" />
  </g>
</template>

<style scoped lang="scss">
.new-point {
  opacity: 0.5;
  pointer-events: none;
}
.path {
  stroke: url(#line-gradient);
  stroke-width: 5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 8 16;
  stroke-dashoffset: 16;
}
</style>
