'use strict';

(function () {
  // Получение случайного числа
  window.common = {
    getRandomNumber: function (minNum, maxNum) {
      return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
    }
  };
})();
