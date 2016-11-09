var Regexp = require('path-to-regexp');

function match(path, pathname) {
  var keys = [];
  var regexp = Regexp(path, keys);
  var m = regexp.exec(pathname);
  var params = {};

  if (!m) return false;

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];
    var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];
    if (key) params[key.name] = val;
  }

  return params;
}

module.exports = function (routes) {
  var cache = Object.create(null);
  
  return function router (pathname) {
    if (pathname in cache) return cache[pathname];

    for (var route in routes) {
      var params = match(route, pathname);

      if (params) {
        return cache[pathname] = { 
        	params: params, 
        	handler: routes[route] 
        };
      }
    }

    return cache[pathname] = { 
    	params: false, 
    	handler: false 
    };
  }
}