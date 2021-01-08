<script lang="ts">
import { key, Property, allowedValueUnits } from '@/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {},

  setup() {
    const store = useStore(key)
    const options = computed(() => store.state.options)

    const property = computed({
      get: () => options.value.property,
      set: value => {
        store.commit('updateOptions', { property: value })
      }
    })
    const fromValue = computed({
      get: () => options.value.fromValue,
      set: value => {
        store.commit('updateOptions', { fromValue: value })
      }
    })
    const toValue = computed({
      get: () => options.value.toValue,
      set: value => {
        store.commit('updateOptions', { toValue: value })
      }
    })
    const duration = computed({
      get: () => options.value.duration,
      set: value => {
        store.commit('updateOptions', { duration: value })
      }
    })
    const valueUnits = computed({
      get: () => options.value.valueUnits,
      set: value => {
        store.commit('updateOptions', { valueUnits: value })
      }
    })

    const valueUnitsList = computed(
      () => allowedValueUnits[options.value.property]
    )

    return {
      options,
      property,
      fromValue,
      toValue,
      duration,
      valueUnits,
      Property,
      valueUnitsList
    }
  }
})
</script>

<template>
  <div class="options">
    <div class="option option--property">
      <label class="label" for="property">Property</label>
      <div class="field-wrapper">
        <span class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
            />
          </svg>
        </span>
        <select
          class="field field--select"
          name="property"
          id="property"
          v-model="property"
        >
          <option
            v-for="[key, value] of Object.entries(Property)"
            :key="key"
            :value="value"
            >{{ key }}</option
          >
        </select>
      </div>
    </div>

    <div class="option option--valueUnits">
      <label class="label" for="valueUnits">Units</label>
      <div class="field-wrapper">
        <span class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <select
          class="field field--select"
          name="valueUnits"
          id="valueUnits"
          v-model="valueUnits"
        >
          <option v-for="value of valueUnitsList" :key="value" :value="value">
            {{ value || 'none' }}
          </option>
        </select>
      </div>
    </div>

    <div class="option option--fromValue">
      <label class="label" for="fromValue">Initial value</label>
      <div class="field-wrapper">
        <span class="icon">
          <svg
            transform="rotate(90)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <input
          class="field"
          type="number"
          name="fromValue"
          id="fromValue"
          v-model.number="fromValue"
          placeholder="0"
        />
      </div>
    </div>

    <div class="option option--toValue">
      <label class="label" for="toValue">Final value</label>
      <div class="field-wrapper">
        <span class="icon">
          <svg
            transform="rotate(-90)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <input
          class="field"
          type="number"
          name="toValue"
          id="toValue"
          v-model.number="toValue"
          width="6ch"
          placeholder="1"
        />
      </div>
    </div>

    <div class="option option--beginingDelay">
      <label class="label" for="beginingDelay">Begining delay</label>
      <div class="field-wrapper">
        <span class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <input
          class="field"
          type="number"
          name="beginingDelay"
          id="beginingDelay"
          v-model.number="options.beginingDelay"
          min="0"
          placeholder="0"
        />
      </div>
    </div>

    <div class="option option--duration">
      <label class="label" for="duration"
        >Duration <span class="small">(ms)</span></label
      >
      <div class="field-wrapper">
        <span class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <input
          class="field"
          type="number"
          name="duration"
          id="duration"
          v-model.number="duration"
          min="0"
          placeholder="0"
        />
      </div>
    </div>

    <div class="option option--endDelay">
      <label class="label" for="endDelay">End delay</label>
      <div class="field-wrapper">
        <span class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <input
          class="field"
          type="number"
          name="endDelay"
          id="endDelay"
          v-model.number="options.endDelay"
          min="0"
          placeholder="0"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input[type='number'] {
  min-width: 8ch;
}
.options {
  display: grid;
  gap: 1.25rem 1.5rem;
  grid-template: auto auto auto / repeat(6, 1fr);
  grid-template-areas:
    'p p p u u u'
    'i i i f f f'
    'b b d d e e';
}

.option {
  font-size: 0.875rem;
  line-height: 1.25rem;

  &--property {
    grid-area: p;
  }
  &--duration {
    grid-area: d;
  }
  &--fromValue {
    grid-area: i;
  }
  &--toValue {
    grid-area: f;
  }
  &--valueUnits {
    grid-area: u;
  }
  &--beginingDelay {
    grid-area: b;
  }
  &--endDelay {
    grid-area: e;
  }
  .label {
    display: block;
    color: #374151;
    font-weight: 500;
    margin-top: -0.25rem;

    .small {
      color: #9498a0;
    }
  }
  .field-wrapper {
    width: 100%;
    position: relative;

    .field {
      display: block;
      padding: 0.5rem 0.75rem;
      border: solid 1px #d1d5db;
      background-color: #fff;
      border-radius: 0.375rem;
      margin-top: 0.128rem;
      appearance: none;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 0 0 #6466f1;
      transition: box-shadow 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
      padding-left: 2rem;
      outline: none;
    }
    select.field {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="rgba(0,0,0,0.3)"><path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>');
      background-repeat: no-repeat;
      background-position: calc(100% - 0.25rem);
      background-size: 20px;
      padding-right: 1.75rem;
    }
    .field:focus {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 0 0.125rem #6466f1;
    }
    .icon {
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0.5rem;
      display: flex;
      align-items: center;
      pointer-events: none;

      svg {
        height: 20px;
        color: #9da6b2;
      }
    }
  }
}
</style>
