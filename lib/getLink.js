"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLink = exports.getRouteParams = void 0;

var _reactRouterDom = require("react-router-dom");

var _memoize = require("./memoize");

var _createAbsoluteRoutes = require("./createAbsoluteRoutes");

var _getRouteParams = function _getRouteParams(routes) {
  return (0, _memoize.memoize)(function (pathname) {
    for (var _key in routes) {
      var route = routes[_key];
      var match = (0, _reactRouterDom.matchPath)(pathname, {
        path: route.path,
        exact: true
      });

      if (match) {
        return {
          route: route,
          match: match
        };
      }
    }
  });
};

var getRouteParams = function getRouteParams(_ref) {
  var location = _ref.location,
      _ref$routes = _ref.routes,
      routes = _ref$routes === void 0 ? _createAbsoluteRoutes.absoluteRoutes : _ref$routes;
  return location ? _getRouteParams(routes)(location.pathname) : null;
};

exports.getRouteParams = getRouteParams;

var getLink = function getLink(route) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var location = arguments.length > 2 ? arguments[2] : undefined;

  var _ref2 = getRouteParams({
    location: location
  }) || {
    match: {
      params: {}
    }
  },
      match = _ref2.match;

  return route.path.split('/').map(function (path) {
    if (path[0] === ':') {
      var paramName = path.slice(1);
      return params[paramName] || match.params[paramName] || route.defaultValue;
    }

    return path;
  }).join('/');
};

exports.getLink = getLink;