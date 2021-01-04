<script lang="ts">
import { computed, defineComponent } from 'vue'

import { invertCoordenates } from '@/helpers'
import { useStore } from 'vuex'
import { key } from '@/store'

export default defineComponent({
  props: {
    position: { type: Number, required: true }
  },

  setup(props) {
    const store = useStore(key)
    const cd = computed(() => store.state.canvasDimensions)

    const positionInverted = computed(() => invertCoordenates(props.position))

    return {
      positionInverted,
      cd
    }
  }
})
</script>

<template>
  <g aria-hidden="true">
    <line
      :x1="cd.offset.x"
      :x2="cd.offset.x + cd.width"
      :y1="cd.height * (cd.stepY / 2 + positionInverted + cd.maxY - 1)"
      :y2="cd.height * (cd.stepY / 2 + positionInverted + cd.maxY - 1)"
      stroke="#E0DED5"
    />
    <text
      :x="cd.offset.x - 8"
      :y="cd.height * (cd.stepY / 2 + positionInverted + cd.maxY - 1) + 4"
      text-anchor="end"
      class="text"
      >{{ (position * 100).toFixed() }}%</text
    >
  </g>
</template>

<style scoped lang="scss">
.text {
  fill: #949186;
  font-size: 0.8rem;
}
</style>
