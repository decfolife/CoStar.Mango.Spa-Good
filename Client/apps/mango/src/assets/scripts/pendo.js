(function (p, e, n, d, o) {
  var pendoUrl =
    'https://content.pendo.costarremanager.com/agent/static/2d454c1b-14a7-4055-7899-ee4c3375ca3d/pendo.js';
  var v, w, x, y, z;
  o = p[d] = p[d] || {};
  o._q = [];
  v = ['initialize', 'identify', 'updateOptions', 'pageLoad'];
  for (w = 0, x = v.length; w < x; ++w)
    (function (m) {
      o[m] =
        o[m] ||
        function () {
          o._q[m === v[0] ? 'unshift' : 'push'](
            [m].concat([].slice.call(arguments, 0))
          );
        };
    })(v[w]);
  y = e.createElement(n);
  y.async = !0;
  y.src = pendoUrl;
  z = e.getElementsByTagName(n)[0];
  z.parentNode.insertBefore(y, z);
})(window, document, 'script', 'pendo');
