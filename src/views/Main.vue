<script lang="ts">
import KeyframesCanvas from '@/components/KeyframesCanvas.vue'
import Preview from '@/components/Preview.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import Options from '@/components/Options.vue'
import Instructions from '@/components/Instructions.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { KeyframesCanvas, CodeBlock, Preview, Options, Instructions },

  setup() {
    return {}
  }
})
</script>

<template>
  <main class="main-layout">
    <keyframes-canvas class="keyframes-canvas" />
    <options class="options" />
    <preview class="preview" />
    <instructions class="instructions" />
    <code-block />
  </main>
</template>

<style scoped lang="scss">
.main-layout {
  display: grid;
  grid-template: min-content min-content min-content 1fr / min-content auto;
  grid-template-areas:
    'canvas instructions'
    'canvas code'
    'options code'
    'preview code';
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
  height: 100%;
  box-sizing: border-box;
}
.keyframes-canvas {
  grid-area: canvas;
}
.preview {
  grid-area: preview;
}
.options {
  grid-area: options;
}
.instructions {
  grid-area: instructions;
}
</style>
