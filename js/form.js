'use strict';
// модуль, который работает с формой объявления

(function () {
  var formFilter = document.querySelector('.map__filters');
  var formAnnoucement = document.querySelector('.ad-form');
  var pin = document.querySelector('.map__pin--main');
  var announcements = window.data.createArray();
  var inputs = formAnnoucement.querySelectorAll('input');
  var fieldsets = formAnnoucement.querySelectorAll('fieldset');
  var selects = formAnnoucement.querySelectorAll('select');
  var selectsFilter = formFilter.querySelectorAll('select');
  var selectTimein = formAnnoucement.querySelector('#timein');
  var selectTimeout = formAnnoucement.querySelector('#timeout');
  var selectRooms = formAnnoucement.querySelector('#room_number');
  var selectCapacity = formAnnoucement.querySelector('#capacity');
  var selectType = formAnnoucement.querySelector('#type');
  var inputPrice = formAnnoucement.querySelector('#price');
  var minPriceMap = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  // функция для изменения состояния (заблокирован или не заблокирован) элементов формы.
  var setElementsCondition = function (elements, conditionElements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = conditionElements;
    }
  };

  // Синхронизация заполнения полей "Время заезда" и "Время выезда"
  var onSelectChange = function (evt) {
    var secondSelect = evt.target === selectTimein ? selectTimeout : selectTimein;
    secondSelect.value = evt.target.value;
  };

  selectTimein.addEventListener('change', onSelectChange);
  selectTimeout.addEventListener('change', onSelectChange);

  // Синхронизация заполнения полей "Количество комнат" и "Количество гостей"
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

  var updateTypeSelect = function (type) {
    var min = minPriceMap[type];
    inputPrice.min = min;
    inputPrice.placeholder = min;
  };
  var onFormSelectTypeChange = function (evt) {
    updateTypeSelect(evt.target.value);
  };
  selectType.addEventListener('change', onFormSelectTypeChange);

  window.form = {
    setAddres: function (blocked) {
      var pinTop = pin.offsetTop;
      var pinLeft = pin.offsetLeft;
      var RADIUS_PIN = pin.offsetWidth;
      var pinTipHeight = blocked ? 0 : 22;
      var x = pinLeft + Math.floor(RADIUS_PIN / 2);
      var y = pinTop + RADIUS_PIN + pinTipHeight;
      formAnnoucement.querySelector('#address').value = x + ', ' + y;
    },
    setNonactiveMode: function () {
      setElementsCondition(inputs, true);
      setElementsCondition(fieldsets, true);
      setElementsCondition(selects, true);
      setElementsCondition(selectsFilter, true);
      window.form.setAddres(true);
    },
    setActiveMode: function () {
      var map = document.querySelector('.map');
      var formFilters = document.querySelector('.map__filters');
      map.classList.remove('map--faded');
      formAnnoucement.classList.remove('ad-form--disabled');
      formFilters.classList.remove('map__filters--disabled');
      setElementsCondition(inputs, false);
      setElementsCondition(fieldsets, false);
      setElementsCondition(selects, false);
      setElementsCondition(selectsFilter, false);
      window.map.fillSimilarAnnoucements(announcements);
    }
  };

  window.form.setNonactiveMode();
})();

