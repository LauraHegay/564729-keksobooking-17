'use strict';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var similarAnnoucementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// Получение случайного числа
var getRandomNumber = function (minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
};
// Создает очередной случайный объект для массива.
var createRundomObject = function () {
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var data = {
    author: {
      avatar: 'img/avatars/user' + '0' + getRandomNumber(1, 8) + '.png'
    },
    offer: {
      type: OFFER_TYPE[getRandomNumber(0, 3)]
    },
    location: {
      x: getRandomNumber(125, 1200),
      y: getRandomNumber(130, 630)
    }
  };
  return data;
};
// Создает массив из N элементов с этими случайными значениями внутри.
var createArray = function () {
  var announcements = [];
  for (var i = 0; i < 8; i++) {
    announcements[i] = createRundomObject();
  }
  return announcements;
};

var announcements = createArray();

// функцию создания DOM-элемента на основе JS-объекта,
var createSimilarAnnoucements = function (template) {
  return template.cloneNode(true);
};
// функцию заполнения блока DOM-элементами на основе массива JS-объектов.
var fillSimilarAnnoucements = function (data) {
  var similarListElement = document.querySelector('.map__pins');
  var annoucementAllElement = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var annoucementElement = createSimilarAnnoucements(similarAnnoucementTemplate);
    annoucementElement.querySelector('img').src = data[i].author.avatar;
    annoucementElement.style.top = data[i].location.y - PIN_WIDTH / 2 + 'px';
    annoucementElement.style.left = data[i].location.x - PIN_HEIGHT + 'px';
    annoucementAllElement.appendChild(annoucementElement);
  }
  similarListElement.appendChild(annoucementAllElement);
};

fillSimilarAnnoucements(announcements);

