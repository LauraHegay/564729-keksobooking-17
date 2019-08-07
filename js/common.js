'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  window.common = {
    getRandomNumber: function (minNum, maxNum) {
      return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
    },
    debounce: function (cb) {
      var lastTimeout = null;
      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
