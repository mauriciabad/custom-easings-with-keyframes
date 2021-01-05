<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  components: { Icon },
  props: {},

  setup() {
    return {}
  }
})
</script>

<template>
  <div class="instructions">
    <div class="background"></div>
    <ul>
      <li>
        <icon name="left-click" />
        <icon name="right-arrow" />Add point / Select point
      </li>
      <li>
        <icon name="move" />
        <icon name="right-arrow" />Move selected points
      </li>
      <li>
        <icon name="key-backspace" />
        <icon name="slash" style="margin: 0 -2px;" />
        <icon name="right-click" style="margin: 0 -2px;" />
        <icon name="right-arrow" />Delete selected points
      </li>
      <li>
        <icon name="key-shift" />
        <icon name="plus" style="margin: 0 -2px;" />
        <icon name="left-click" style="margin: 0 -2px;" />
        <icon name="right-arrow" />Select many points
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.instructions {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #222;
  opacity: 0.33;
  transition: opacity 200ms ease-out;
  display: inline-block;
  position: relative;
  will-change: opacity;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;

  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border: solid 1px #dfddd5;
    border-radius: inherit;
    opacity: 0;
    transition: inherit;
  }

  &:hover {
    opacity: 1;

    .background {
      opacity: 1;
    }
  }

  ul {
    will-change: opacity;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 0.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
