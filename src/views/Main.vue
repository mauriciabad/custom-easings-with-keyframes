<script lang="ts">
import KeyframesCanvas from '@/components/KeyframesCanvas/KeyframesCanvas.vue'
import Preview from '@/components/Preview.vue'
import Animation from '@/components/Animation.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import Options from '@/components/Options.vue'
import Buttons from '@/components/Buttons.vue'
import Popup from '@/components/Popup.vue'
import Welcome from '@/components/Welcome.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    KeyframesCanvas,
    CodeBlock,
    Preview,
    Options,
    Animation,
    Buttons,
    Popup,
    Welcome
  },

  setup() {
    const isWelcomeVisible = ref<boolean>(
      window.localStorage['welcomeMessageWasSeen'] !== 'true'
    )
    window.localStorage['welcomeMessageWasSeen'] = 'true'

    return {
      isWelcomeVisible
    }
  }
})
</script>

<template>
  <main class="main-layout">
    <keyframes-canvas class="keyframes-canvas" />
    <animation class="animation" />
    <welcome class="welcome" v-model:isVisible="isWelcomeVisible" />
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
  grid-template: min-content 17rem min-content 1fr min-content/ 1fr min-content min-content;
  grid-template-areas:
    'welcome welcome code'
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
.welcome {
  grid-area: welcome;
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
