'use strict';
//  модуль, который создаёт данные
(function () {
  // Создает очередной случайный объект для массива.
  var createRundomObject = function () {
    var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
    var data = {
      author: {
        avatar: 'img/avatars/user' + '0' + window.common.getRandomNumber(1, 8) + '.png'
      },
      offer: {
        type: OFFER_TYPE[window.common.getRandomNumber(0, 3)]
      },
      location: {
        x: window.common.getRandomNumber(125, 1200),
        y: window.common.getRandomNumber(130, 630)
      }
    };
    return data;
  };
  window.data = {
    // Создает массив из N элементов с этими случайными значениями внутри.
    createArray: function () {
      var announcements = [];
      for (var i = 0; i < 8; i++) {
        announcements[i] = createRundomObject();
      }
      return announcements;
    }
  };
})();
