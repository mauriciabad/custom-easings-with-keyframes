/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  pwa: {
    manifestOptions: {
      name: 'Keyframes easings',
      short_name: 'Keyframes easings',
      decription:
        'Make custom non cubic bezier easing functions using keyframes and animations with this online css code generator developer tool, like elastic and bounce easings',
      icons: [
        {
          src: '/img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/img/icons/android-chrome-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/img/icons/android-chrome-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/img/icons/safari-pinned-tab.svg',
          sizes: 'any',
          type: 'image/svg',
          purpose: 'monochrome'
        }
      ],
      theme_color: '#719dff',
      background_color: '#ffffff',
      display: 'standalone',
      lang: 'en-GB'
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
    msTileColor: '#719dff'
  }
}
