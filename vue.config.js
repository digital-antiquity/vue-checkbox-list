// vue.config.js
var path = require("path");
module.exports = {
    // options...

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        port: 9000
      }
  }