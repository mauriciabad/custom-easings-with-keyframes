<template>
  <main class="main-layout">
    <keyframes-canvas />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Main',
  props: {
    msg: String
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-layout {
  display: grid;
  grid-template: minmax(auto, 1000px) / minmax(auto, 800px);
  align-items: center;
  justify-content: center;
}
</style>
