<script lang="ts">
import KeyframesCanvas from '@/components/KeyframesCanvas.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { KeyframesCanvas },
  props: {
    msg: String
  }
})
</script>

<template>
  <main class="main-layout">
    <keyframes-canvas />
  </main>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-layout {
  display: grid;
  grid-template: minmax(auto, 500px) / minmax(auto, 1000px);
  align-items: center;
  justify-content: center;
}
</style>
