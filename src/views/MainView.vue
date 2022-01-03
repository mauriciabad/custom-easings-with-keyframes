<script lang="ts">
import AnimationCode from '@/components/animation/AnimationCode.vue'
import AnimationOptions from '@/components/animation/AnimationOptions.vue'
import AnimationPreview from '@/components/animation/AnimationPreview.vue'
import FooterButtons from '@/components/FooterButtons.vue'
import KeyframesCanvas from '@/components/keyframesCanvas/KeyframesCanvas.vue'
import KeyframesCanvasPreview from '@/components/keyframesCanvas/KeyframesCanvasPreview.vue'
import SmallScreenPopup from '@/components/SmallScreenPopup.vue'
import WelcomePopup from '@/components/WelcomePopup.vue'
import { persistedRef } from '@/compositions/useLocalStorageRefs'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  components: {
    AnimationCode,
    AnimationOptions,
    AnimationPreview,
    FooterButtons,
    KeyframesCanvas,
    KeyframesCanvasPreview,
    SmallScreenPopup,
    WelcomePopup
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
    <keyframes-canvas-preview class="animation" />
    <animation-code />
    <animation-options class="options" />
    <animation-preview class="preview" />
    <footer-buttons class="buttons" @help-clicked="isWelcomeVisible = true" />
  </main>

  <welcome-popup v-model:isVisible="isWelcomeVisible" />

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
