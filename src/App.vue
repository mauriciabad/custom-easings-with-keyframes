<script lang="ts">
import { defineComponent } from 'vue'
import UpdateBanner from './components/UpdateBanner.vue'

export default defineComponent({
  components: {
    UpdateBanner
  }
})
</script>

<template>
  <router-view />
  <update-banner />
</template>

<style lang="scss">
@use '~inter-ui/variable' with (
  $inter-font-display: swap,
  $inter-font-path: '~inter-ui/Inter (web)'
);
@include variable.all;

$defaultEmojiFonts: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji';

$defaultFonts: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
  $defaultEmojiFonts;

$defaultMonoFonts: ui-monospace, SFMono-Regular, Monaco, Consolas,
  Liberation Mono, Roboto Mono, Courier New, monospace, $defaultEmojiFonts;

body {
  font-family: 'Inter var', $defaultFonts;
  margin: 0;
}
input,
textarea,
button,
optgroup,
select {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
button {
  cursor: pointer;
  line-height: 1;
  border: 0;
  background: none;
  color: currentColor;
  appearance: button;
}
code,
pre {
  font-family: Menlo, $defaultMonoFonts;
}
</style>
