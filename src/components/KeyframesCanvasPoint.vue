<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    x: Number,
    y: Number
  }
})
</script>

<template>
  <rect :x="x" :y="y" width="10" height="10" fill="#00f" />
</template>

<style scoped lang="scss"></style>
