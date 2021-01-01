<script lang="ts">
import { key } from '@/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {},

  setup() {
    const store = useStore(key)
    const options = computed(() => store.state.options)

    return { options }
  }
})
</script>

<template>
  <div class="options">
    <label for="property">Property</label>
    <select name="property" id="property" v-model="options.property">
      <option value="scale">scale</option>
      <option value="translateX">translateX</option>
      <option value="translateY">translateY</option>
      <option value="translateZ">translateZ</option>
      <option value="opacity">opacity</option>
      <option value="rotate">rotate</option>
    </select>

    <label for="duration">Duration (ms)</label>
    <input
      type="number"
      name="duration"
      id="duration"
      v-model.number="options.duration"
      min="0"
    />

    <label for="fromValue">Initial value</label>
    <input
      type="number"
      name="fromValue"
      id="fromValue"
      v-model.number="options.fromValue"
    />

    <label for="toValue">Final value</label>
    <input
      type="number"
      name="toValue"
      id="toValue"
      v-model.number="options.toValue"
    />

    <label for="valueUnits">Units</label>
    <select name="valueUnits" id="valueUnits" v-model="options.valueUnits">
      <option value="">none</option>
      <option value="px">px</option>
      <option value="em">em</option>
      <option value="rem">rem</option>
      <option value="%">%</option>
      <option value="deg">deg</option>
      <option value="turn">turn</option>
      <option value="vh">vh</option>
      <option value="vw">vw</option>
    </select>
  </div>
</template>
