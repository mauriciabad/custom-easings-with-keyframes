<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="cbx">
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input :id="id" v-model="localValue" type="checkbox" />
    <div class="animation-helper" />
    <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
      <path d="M2 8.36364L6.23077 12L13 2"></path>
    </svg>
  </div>

  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none">
    <defs>
      <filter id="goo">
        <feGaussianBlur
          in="SourceGraphic"
          stddeviation="4"
          result="blur"
        ></feGaussianBlur>
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
          result="goo"
        ></feColorMatrix>
        <feBlend in="SourceGraphic" in2="goo"></feBlend>
      </filter>
    </defs>
  </svg>
</template>

<style lang="scss" scoped>
$primary: #866efb;

.cbx {
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  position: relative;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    border: 2px solid #bfbfc0;
    border-radius: 50%;
    cursor: pointer;
    margin: 0;
    appearance: none;
    outline: none;
    box-shadow: 0 0 0 0 #fff;
    transition: box-shadow 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);

    &:focus-visible {
      box-shadow: 0 0 0 0.1875rem #333;
      outline: none;
    }

    &:checked {
      & + .animation-helper {
        animation: splash 0.6s ease forwards;
        & + svg {
          path {
            stroke-dashoffset: 0;
          }
        }
      }
    }
  }
  .animation-helper {
    width: 24px;
    height: 24px;
    background: none;
    border-radius: 50%;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    filter: url('#goo');
    transform: trasnlate3d(0, 0, 0);
    pointer-events: none;
  }
  svg {
    box-sizing: border-box;
    position: absolute;
    top: 5px;
    left: 4px;
    z-index: 1;
    pointer-events: none;
    path {
      stroke: #fff;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 19;
      stroke-dashoffset: 19;
      transition: stroke-dashoffset 0.3s ease;
      transition-delay: 0.2s;
    }
  }
}

@keyframes splash {
  40% {
    background: $primary;
    box-shadow: 0 -18px 0 -8px $primary, 16px -8px 0 -8px $primary,
      16px 8px 0 -8px $primary, 0 18px 0 -8px $primary,
      -16px 8px 0 -8px $primary, -16px -8px 0 -8px $primary;
  }
  100% {
    background: $primary;
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
      32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
      -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}
</style>
