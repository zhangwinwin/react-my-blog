require('@babel/register')(
  {
    plugins: ['@babel/plugin-transform-modules-commonjs']
  }
)
module.exports = require('./app.js')