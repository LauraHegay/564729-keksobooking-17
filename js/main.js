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
    annoucementElement.style.top = data[i].location.y - PIN_HEIGHT + 'px';
    annoucementElement.style.left = data[i].location.x - PIN_WIDTH / 2 + 'px';
    annoucementAllElement.appendChild(annoucementElement);
  }
  similarListElement.appendChild(annoucementAllElement);
};

// функция для изменения состояния (заблокирован или не заблокирован) элементов формы.
var setElementsCondition = function (elements, conditionElements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = conditionElements;
  }
};

var pin = document.querySelector('.map__pin--main');
var formAnnoucement = document.querySelector('.ad-form');
var formFilter = document.querySelector('.map__filters');
var inputs = formAnnoucement.querySelectorAll('input');
var fieldsets = formAnnoucement.querySelectorAll('fieldset');
var selects = formAnnoucement.querySelectorAll('select');
var selectsFilter = formFilter.querySelectorAll('select');


// Синхронизация заполнения полей "Количество комнат" и "Количество гостей"
var selectRoom = formAnnoucement.querySelector('#room_number');
var selectCapacity = formAnnoucement.querySelector('#capacity');
var setSynchronizeRoom = function () {
  var currentSelectValue = selectRoom.value;
  if (currentSelectValue === '100') {
    for (var i = 0; i < selectCapacity.length; i++) {
      selectCapacity.options[i].disabled = true;
    }
    selectCapacity.options[selectCapacity.length - 1].disabled = false;
    selectCapacity.options[selectCapacity.length - 1].selected = true;
  } else {
    for (i = 0; i < selectCapacity.length - 1; i++) {
      if (i < currentSelectValue) {
        selectCapacity.options[selectCapacity.length - 2 - i].disabled = false;
        selectCapacity.options[selectCapacity.length - 2 - i].selected = true;
      } else {
        selectCapacity.options[selectCapacity.length - 2 - i].disabled = true;
      }
    }
    selectCapacity.options[3].disabled = true;
  }
};
// Синхронизация заполнения полей "Время заезда" и "Время выезда"
var selectTimein = formAnnoucement.querySelector('#timein');
var selectTimeout = formAnnoucement.querySelector('#timeout');
var setSynchronizeTimein = function () {
  var currentSelectValue = selectTimein.value;
  for (var i = 0; i < selectTimein.length; i++) {
    if (currentSelectValue === selectTimeout.options[i].value) {
      selectTimeout.options[i].disabled = false;
      selectTimeout.options[i].selected = true;
    } else {
      selectTimeout.options[i].disabled = true;
    }
  }
};


var onFormSelectRoomChange = function () {
  setSynchronizeRoom();
};

var onFormSelectTimeinChange = function () {
  setSynchronizeTimein();
};
selectRoom.addEventListener('change', onFormSelectRoomChange);
selectTimein.addEventListener('change', onFormSelectTimeinChange);

var setAddres = function (blocked) {
  var pinTop = pin.offsetTop;
  var pinLeft = pin.offsetLeft;
  var RADIUS_PIN = pin.offsetWidth;
  var pinTipHeight = blocked ? 0 : 22;
  var x = pinLeft + Math.floor(RADIUS_PIN / 2);
  var y = pinTop + Math.floor(RADIUS_PIN / 2) + pinTipHeight;
  formAnnoucement.querySelector('#address').value = x + ', ' + y;
};
var setNonactiveMode = function () {
  setElementsCondition(inputs, true);
  setElementsCondition(fieldsets, true);
  setElementsCondition(selects, true);
  setElementsCondition(selectsFilter, true);
  setAddres(true);
};
var setActiveMode = function () {
  var map = document.querySelector('.map');
  var formFilters = document.querySelector('.map__filters');
  map.classList.remove('map--faded');
  formAnnoucement.classList.remove('ad-form--disabled');
  formFilters.classList.remove('map__filters--disabled');
  setElementsCondition(inputs, false);
  setElementsCondition(fieldsets, false);
  setElementsCondition(selects, false);
  setElementsCondition(selectsFilter, false);
  fillSimilarAnnoucements(announcements);
  setSynchronizeRoom();
  setSynchronizeTimein();
};
setNonactiveMode();

var onPinButtonClick = function () {
  setActiveMode();
};

var onPinButtonMouseup = function () {
  setAddres(false);
};

pin.addEventListener('click', onPinButtonClick);
pin.addEventListener('mouseup', onPinButtonMouseup);
