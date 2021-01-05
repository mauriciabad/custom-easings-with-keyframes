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
    <div class="option">
      <label class="label" for="property">Property</label>
      <select
        class="field field--select"
        name="property"
        id="property"
        v-model="options.property"
      >
        <option value="scale">scale</option>
        <option value="translateX">translateX</option>
        <option value="translateY">translateY</option>
        <option value="translateZ">translateZ</option>
        <option value="opacity">opacity</option>
        <option value="rotate">rotate</option>
      </select>
    </div>
    <div class="option">
      <label class="label" for="duration">Duration (ms)</label>
      <input
        class="field"
        type="number"
        name="duration"
        id="duration"
        v-model.number="options.duration"
        min="0"
      />
    </div>

    <div class="option">
      <label class="label" for="fromValue">Initial value</label>
      <input
        class="field"
        type="number"
        name="fromValue"
        id="fromValue"
        v-model.number="options.fromValue"
      />
    </div>

    <div class="option">
      <label class="label" for="toValue">Final value</label>
      <input
        class="field"
        type="number"
        name="toValue"
        id="toValue"
        v-model.number="options.toValue"
        width="6ch"
      />
    </div>

    <div class="option">
      <label class="label" for="valueUnits">Units</label>
      <select
        class="field field--select"
        name="valueUnits"
        id="valueUnits"
        v-model="options.valueUnits"
      >
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
  </div>
</template>

<style lang="scss" scoped>
input[type='number'] {
  min-width: 8ch;
}
.options {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr 1fr;
}

.option {
  font-size: 0.875rem;
  line-height: 1.25rem;

  .label {
    display: block;
    color: #374151;
    font-weight: 500;
  }
  .field {
    display: block;
    padding: 0.5rem 0.75rem;
    border: solid 1px #d1d5db;
    border-radius: 0.375rem;
    margin-top: 0.128rem;
    appearance: none;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
}
</style>
