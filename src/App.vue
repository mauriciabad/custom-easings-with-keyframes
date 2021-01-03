<template>
  <router-view />
</template>

<style lang="scss">
@use "~inter-ui/variable" with (
  $inter-font-display: swap,
  $inter-font-path: '~inter-ui/Inter (web)'
);
@include variable.all;
@import '~@fontsource/roboto-mono/500.css';
@import '~@fontsource/poppins/700.css';

$defaultFonts: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

html,
body,
input,
textarea,
button {
  font-family: 'Inter var', $defaultFonts;
}

#app {
  height: 100%;
}
body {
  margin: 0;
  height: 100vh;
  min-height: 100vh;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  font-family: Poppins, $defaultFonts;
}
code {
  font-weight: 500;
  font-family: 'Roboto Mono', ui-monospace, monospace;
}
</style>
