<script lang="ts">
import Animation from '@/components/Animation.vue'
import Buttons from '@/components/Buttons.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import KeyframesCanvas from '@/components/KeyframesCanvas/KeyframesCanvas.vue'
import Options from '@/components/Options.vue'
import SmallScreenPopup from '@/components/SmallScreenPopup.vue'
import Preview from '@/components/Preview.vue'
import Welcome from '@/components/Welcome.vue'
import { defineComponent, ref, watch } from 'vue'
import { persistedRef } from '@/compositions/useLocalStorageRefs'

export default defineComponent({
  components: {
    Animation,
    Buttons,
    CodeBlock,
    KeyframesCanvas,
    Options,
    SmallScreenPopup,
    Preview,
    Welcome
  },

  setup() {
    const welcomeMessageWasSeen = persistedRef<boolean>(
      'welcomeMessageWasSeen',
      false
    )

    const isWelcomeVisible = ref<boolean>(!welcomeMessageWasSeen.value)

    const unwatchIsWelcomeVisible = watch(isWelcomeVisible, (newValue) => {
      if (newValue === false) {
        welcomeMessageWasSeen.value = true
        unwatchIsWelcomeVisible()
      }
    })

    return { isWelcomeVisible, welcomeMessageWasSeen }
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
    <buttons class="buttons" @help-clicked="isWelcomeVisible = true" />
  </main>

  <welcome v-model:isVisible="isWelcomeVisible" />

  <small-screen-popup />
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
