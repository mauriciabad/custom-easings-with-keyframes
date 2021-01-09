/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  pwa: {
    // name: 'Keyframes easing',
    // themeColor: '#719dff',
    // msTileColor: '#719dff',
    manifestOptions: {
      name: 'Keyframes easing',
      short_name: 'Keyframes easing',
      icons: [
        {
          src: '/img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: '#719dff',
      background_color: '#ffffff',
      display: 'standalone'
    }
  }
}
