"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.absoluteRoutes = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var absoluteRoutes = {};
exports.absoluteRoutes = absoluteRoutes;

var createAbsoluteRoutes = function createAbsoluteRoutes(relativeRoutes) {
  var getRoute = function getRoute(routeName) {
    var route = relativeRoutes[routeName];
    var parentRoute = route.parent ? getRoute(route.parent) : {
      path: null
    };
    return _objectSpread({}, route, {
      component: route.component,
      path: (parentRoute.path || '') + route.path
    });
  };

  Object.keys(relativeRoutes).forEach(function (routeName) {
    absoluteRoutes[routeName] = getRoute(routeName);
  });
  return absoluteRoutes;
};

var _default = createAbsoluteRoutes;
exports.default = _default;