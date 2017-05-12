var path = require('path');
console.log(__dirname);
var _root = path.resolve(__dirname, '../../');

console.log('-----Nizaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarrrrrrrr',__dirname,_root);
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
exports.root = root;
exports.src = this.root('ng');
exports.dist = this.root('wwwroot');


