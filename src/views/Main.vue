<script lang="ts">
import KeyframesCanvas from '@/components/KeyframesCanvas/KeyframesCanvas.vue'
import Preview from '@/components/Preview.vue'
import Animation from '@/components/Animation.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import Options from '@/components/Options.vue'
import Buttons from '@/components/Buttons.vue'
import Popup from '@/components/Popup.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    KeyframesCanvas,
    CodeBlock,
    Preview,
    Options,
    Animation,
    Buttons,
    Popup
  },

  setup() {
    return {}
  }
})
</script>

<template>
  <main class="main-layout">
    <keyframes-canvas class="keyframes-canvas" />
    <animation class="animation" />
    <code-block />
    <options class="options" />
    <preview class="preview" />
    <buttons class="buttons" />
  </main>
  <popup />
</template>

<style scoped lang="scss">
.main-layout {
  display: grid;
  grid-template: min-content min-content 1fr min-content/ 1fr min-content min-content;
  grid-template-areas:
    'canvas animation code'
    'canvas animation options'
    'canvas animation preview'
    'canvas animation buttons';
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 2rem;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
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
.buttons {
  grid-area: buttons;
}
</style>
