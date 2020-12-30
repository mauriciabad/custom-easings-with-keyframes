<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {},

  setup() {
    return {}
  }
})
</script>

<template>
  <div class="instructions">
    <h2>Instructions</h2>
    <ul>
      <li>Click => Add point / Select point</li>
      <li>Right click / Delete key => Delete selected points</li>
      <li>Drag => Move selected points</li>
      <li>Shift + Click => Select many points</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.instructions {
  border: solid 4px #333;
  padding: 1.75rem 2rem;
  border-radius: 1rem;

  h2 {
    margin: 0 0 1rem;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
