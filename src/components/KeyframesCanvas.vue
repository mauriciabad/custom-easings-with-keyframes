<script lang="ts">
import KeyframesCanvasPoint from '@/components/KeyframesCanvasPoint.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { KeyframesCanvasPoint },
  props: {}
})
</script>

<template>
  <div class="canvas-container">
    <svg viewBox="0 0 1000 800">
      <keyframes-canvas-point :x="100" :y="100" />
    </svg>
  </div>
</template>

<style scoped lang="scss">
.canvas-container {
  width: 100%;
}
</style>
