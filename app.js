/* webpack 支持es6 commonjs 和amd规范 */

//es6
import es6 from './src/vendor/es6';
console.log("sum(1,2)=", sum(1, 2));

//commonjs
var common = require('./src/vendor/common')
console.log('minus(1, 2) = ', minus(1, 2))

// AMD
require(['./src/vendor/multi'], function (multi) {
  console.log('multi(1, 2) = ', multi(1, 2))
})