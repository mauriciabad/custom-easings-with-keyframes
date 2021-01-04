<script lang="ts">
import { key } from '@/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    position: { type: Number, required: true },
    maxY: { type: Number, default: 1.3 },
    minY: { type: Number, default: -0.3 },
    stepY: { type: Number, default: 0.1 }
  },

  setup() {
    const store = useStore(key)
    const canvasDimensions = computed(() => store.state.canvasDimensions)

    return {
      canvasDimensions
    }
  }
})
</script>

<template>
  <g aria-hidden="true">
    <line
      :x1="canvasDimensions.offset.x + position * canvasDimensions.width"
      :x2="canvasDimensions.offset.x + position * canvasDimensions.width"
      :y1="
        canvasDimensions.offset.y + canvasDimensions.height * (minY - stepY / 2)
      "
      :y2="canvasDimensions.offset.y + canvasDimensions.height"
      stroke="#E0DED5"
    />
    <text
      :x="canvasDimensions.offset.x + position * canvasDimensions.width"
      :y="canvasDimensions.offset.y + canvasDimensions.height + 20"
      text-anchor="middle"
      class="text"
    >
      {{ (position * 100).toFixed() }}%
    </text>
    <line
      :x1="canvasDimensions.offset.x + position * canvasDimensions.width"
      :x2="canvasDimensions.offset.x + position * canvasDimensions.width"
      :y1="canvasDimensions.offset.y + canvasDimensions.height + 30"
      :y2="
        canvasDimensions.offset.y + canvasDimensions.height * (maxY + stepY / 2)
      "
      stroke="#E0DED5"
    />
  </g>
</template>

<style scoped lang="scss">
.text {
  fill: #949186;
  font-size: 0.8rem;
}
</style>
