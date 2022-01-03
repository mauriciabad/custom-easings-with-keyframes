<script lang="ts">
import { key } from '@/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    position: { type: Number, required: true }
  },

  setup() {
    const store = useStore(key)
    const cd = computed(() => store.state.canvasDimensions)

    return {
      cd
    }
  }
})
</script>

<template>
  <g aria-hidden="true">
    <line
      :x1="cd.offset.x + position * cd.width"
      :x2="cd.offset.x + position * cd.width"
      :y1="0"
      :y2="cd.height * (cd.maxY + cd.stepY / 2)"
      stroke="#E0DED5"
    />
    <text
      :x="cd.offset.x + position * cd.width"
      :y="cd.height * (cd.maxY + cd.stepY / 2) + 20"
      text-anchor="middle"
      class="text"
    >
      {{ (position * 100).toFixed() }}%
    </text>
    <line
      :x1="cd.offset.x + position * cd.width"
      :x2="cd.offset.x + position * cd.width"
      :y1="cd.height * (cd.maxY + cd.stepY / 2) + 30"
      :y2="cd.height * (cd.maxY - cd.minY + cd.stepY)"
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
