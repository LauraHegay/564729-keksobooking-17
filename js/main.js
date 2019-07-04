'use strict';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

// Получение случайного числа
var getRandomNumber = function (minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
};

var announcements = [
  {
    author: {
      avatar: 'img/avatars/user01.png'
    },
    offer: {
      type: 'palace' // palace, flat, house или bungalo
    },
    location: {
      x: getRandomNumber(125, 1200) - PIN_WIDTH / 2 + 'px',
      y: getRandomNumber(130, 630) - PIN_HEIGHT + 'px'
    }
  },
  {
    author: {
      avatar: 'img/avatars/user02.png'
    },
    offer: {
      type: 'flat' // palace, flat, house или bungalo
    },
    location: {
      x: getRandomNumber(125, 1200) - PIN_WIDTH / 2 + 'px',
      y: getRandomNumber(130, 630) - PIN_HEIGHT + 'px'
    }
  },
  {
    author: {
      avatar: 'img/avatars/user03.png'
    },
    // offer: {
    //   type: 'palace' //palace, flat, house или bungalo
    // },
    location: {
      x: getRandomNumber(125, 1200) - PIN_WIDTH / 2 + 'px',
      y: getRandomNumber(130, 630) - PIN_HEIGHT + 'px'
    }
  }
];

// функцию создания DOM-элемента на основе JS-объекта,
var createSimilarAnnoucements = function () {
  var similarAnnoucementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  return similarAnnoucementTemplate;
};
// функцию заполнения блока DOM-элементами на основе массива JS-объектов.
var fillSimilarAnnoucements = function (element, data) {
  var similarListElement = document.querySelector('.map__pins');
  for (var i = 0; i < data.length; i++) {
    var AnnoucementElement = element.cloneNode(true);
    AnnoucementElement.querySelector('img').src = data[i].author.avatar;
    AnnoucementElement.style.top = data[i].location.y;
    AnnoucementElement.style.left = data[i].location.x;
    similarListElement.appendChild(AnnoucementElement);
  }
};

var element = createSimilarAnnoucements();
fillSimilarAnnoucements(element, announcements);

