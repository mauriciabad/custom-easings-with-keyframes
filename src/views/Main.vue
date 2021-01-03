<script lang="ts">
import KeyframesCanvas from '@/components/KeyframesCanvas/KeyframesCanvas.vue'
import Preview from '@/components/Preview.vue'
import Animation from '@/components/Animation.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import Options from '@/components/Options.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { KeyframesCanvas, CodeBlock, Preview, Options, Animation },

  setup() {
    return {}
  }
})
</script>

<template>
  <main class="main-layout">
    <keyframes-canvas class="keyframes-canvas" />
    <animation class=" animation" />
    <options class="options" />
    <preview class="preview" />
    <code-block />
  </main>
</template>

<style scoped lang="scss">
.main-layout {
  display: grid;
  grid-template: 20rem min-content 1fr / min-content min-content min-content;
  grid-template-areas:
    'canvas animation code'
    'canvas animation options'
    'canvas animation preview';
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 2rem;
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
.animation {
  grid-area: animation;
  margin-left: -28px;
}
</style>
