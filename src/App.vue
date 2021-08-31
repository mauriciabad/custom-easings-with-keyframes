<template>
  <router-view />
</template>

<style lang="scss">
@use "~inter-ui/variable" with (
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

html,
body,
input,
textarea,
button {
  font-family: 'Inter var', $defaultFonts;
}
body,
button {
  margin: 0;
}
code {
  font-family: Menlo, $defaultMonoFonts;
}
</style>
