const path = require('path');

module.exports = {
  entry: './free-the-clones.js',
  output: {
    path: path.resolve(__dirname, 'DIST'),
    filename: 'free-the-clones.bundle.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};
