"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoize = void 0;
var cache = new (WeakMap || Map)();

var memoize = function memoize(fn) {
  var _memoize = function _memoize() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var cachedValue = cache.get(args);

    if (cachedValue) {
      return cachedValue;
    }

    var result = fn.apply(void 0, args);
    cache.set(args, result);
    return result;
  };

  return _memoize;
};

exports.memoize = memoize;