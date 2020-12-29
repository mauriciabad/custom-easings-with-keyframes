<script lang="ts">
import { computed, defineComponent } from 'vue'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/components/KeyframesCanvas.vue'
import { Point } from '@/components/Canvas.d.ts'
import { invertCoordenates } from '@/components/KeyframesCanvasHelper'
import { useStore } from 'vuex'
import { key } from '@/store'

export default defineComponent({
  props: { point: { type: Object as () => Point, required: true } },

  setup(props) {
    const store = useStore(key)

    const canvasX = computed(() => (props.point.x / 100) * CANVAS_WIDTH)
    const canvasY = computed(
      () => invertCoordenates(props.point.y / 100) * CANVAS_HEIGHT
    )

    function handleMouseDown() {
      store.commit('selectPoint', props.point)
    }

    return { canvasX, canvasY, handleMouseDown }
  }
})
</script>

<template>
  <rect
    :x="canvasX - 7 - 4"
    :y="canvasY - 7 - 4"
    width="22"
    height="22"
    rx="6"
    fill="#FF00A8"
    opacity="0.5"
    class="point-outline"
    :class="{ 'point-outline--selected': point.isSelected }"
  />

  <rect
    :x="canvasX - 7"
    :y="canvasY - 7"
    width="14"
    height="14"
    rx="2"
    fill="#FFED48"
    stroke="black"
    stroke-width="2"
    tabindex="0"
    class="point"
    :class="{ 'point--selected': point.isSelected }"
    @mousedown="handleMouseDown"
  />
</template>

<style scoped lang="scss">
.point-outline {
  pointer-events: none;
  display: none;

  &--selected {
    display: block;
  }
}
.point {
  cursor: pointer;
  outline: none;

  &--selected {
    cursor: move;
    outline: none;
  }
}
</style>
