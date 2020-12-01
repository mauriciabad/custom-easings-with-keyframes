/* eslint-disable @typescript-eslint/no-var-requires */
const GoogleFontsPlugin = require('google-fonts-webpack-plugin')

module.exports = {
  entry: 'main.ts',

  plugins: [
    new GoogleFontsPlugin({
      fonts: [{ family: 'Poppins' }, { family: 'Roboto Mono' }]
    })
  ]
}
