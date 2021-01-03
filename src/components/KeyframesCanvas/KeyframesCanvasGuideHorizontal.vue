<script lang="ts">
import { computed, defineComponent } from 'vue'

import { invertCoordenates } from '@/helpers'
import { useStore } from 'vuex'
import { key } from '@/store'

export default defineComponent({
  props: { position: { type: Number, required: true } },

  setup(props) {
    const store = useStore(key)
    const canvasDimensions = computed(() => store.state.canvasDimensions)

    const positionInverted = computed(() => invertCoordenates(props.position))

    return {
      positionInverted,
      canvasDimensions
    }
  }
})
</script>

<template>
  <g aria-hidden="true">
    <line
      :x1="canvasDimensions.offset.x"
      :x2="canvasDimensions.offset.x + canvasDimensions.width"
      :y1="canvasDimensions.offset.y + position * canvasDimensions.height"
      :y2="canvasDimensions.offset.y + position * canvasDimensions.height"
      stroke="#E0DED5"
    />
    <text
      :x="canvasDimensions.offset.x - 8"
      :y="canvasDimensions.offset.y + position * canvasDimensions.height + 4"
      text-anchor="end"
      class="text"
      >{{ (positionInverted * 100).toFixed() }}%</text
    >
  </g>
</template>

<style scoped lang="scss">
.text {
  fill: #949186;
  font-size: 0.8rem;
}
</style>
