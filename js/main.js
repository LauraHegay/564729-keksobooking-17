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

var setAddres = function (blocked) {
  var pinTop = pin.offsetTop;
  var pinLeft = pin.offsetLeft;
  var RADIUS_PIN = pin.offsetWidth;
  var pinTipHeight = blocked ? 0 : 22;
  var x = pinLeft + Math.floor(RADIUS_PIN / 2);
  var y = pinTop + RADIUS_PIN + pinTipHeight;
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
};
setNonactiveMode();

var onPinButtonMouseup = function () {
  setAddres(false);
};

pin.addEventListener('mouseup', onPinButtonMouseup);

// Синхронизация заполнения полей "Время заезда" и "Время выезда"
var selectTimein = formAnnoucement.querySelector('#timein');
var selectTimeout = formAnnoucement.querySelector('#timeout');

var onSelectChange = function (evt) {
  var secondSelect = evt.target === selectTimein ? selectTimeout : selectTimein;
  secondSelect.value = evt.target.value;
};

selectTimein.addEventListener('change', onSelectChange);
selectTimeout.addEventListener('change', onSelectChange);

// Синхронизация заполнения полей "Количество комнат" и "Количество гостей"
var selectRooms = formAnnoucement.querySelector('#room_number');
var selectCapacity = formAnnoucement.querySelector('#capacity');

var updateGuestsSelect = function (count) {
  var options = selectCapacity.querySelectorAll('option');

  options.forEach(function (elem) {
    var value = parseInt(elem.value, 10);
    var isZero = value === 0;
    elem.disabled = count === 100 ? !isZero : value > count || isZero;
    elem.selected = !elem.disabled;
  });
};

var onFormSelectRoomChange = function (evt) {
  updateGuestsSelect(parseInt(evt.target.value, 10));
};
selectRooms.addEventListener('change', onFormSelectRoomChange);

var selectType = formAnnoucement.querySelector('#type');
var inputPrice = formAnnoucement.querySelector('#price');
var minPriceMap = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};
var updateTypeSelect = function (type) {
  var min = minPriceMap[type];
  inputPrice.min = min;
  inputPrice.placeholder = min;
};
var onFormSelectTypeChange = function (evt) {
  updateTypeSelect(evt.target.value);
};
selectType.addEventListener('change', onFormSelectTypeChange);

// Перетаскивание пина по карте
pin.addEventListener('mousedown', function (evt) {
  var TOP_BORDER_AREA = 43;
  var BOTTOM_BORDER_AREA = 543;
  var LEFT_BORDER_AREA = -32;
  var RIGHT_BORDER_AREA = 1166;
  evt.preventDefault();
  setActiveMode();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var getCoord = function (shift, offset, min, max) {
    var coord = (offset - shift);
    if (coord < min) {
      return min;
    }
    if (coord > max) {
      return max;
    }
    return coord;
  };
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    pin.style.top = getCoord(shift.y, pin.offsetTop, TOP_BORDER_AREA, BOTTOM_BORDER_AREA) + 'px';
    pin.style.left = getCoord(shift.x, pin.offsetLeft, LEFT_BORDER_AREA, RIGHT_BORDER_AREA) + 'px';
    setAddres(false);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
