'use strict';
(function () {
  var formFilter = document.querySelector('.map__filters');
  var selectsHousingType = formFilter.querySelector('#housing-type');
  var advertisments = window.map.getPins();

  var onFormSelectHousingTypeChange = function (evt) {
    var filterHousingType = advertisments.filter(function (data) {
      return data.type === evt.target.value;
    });
  };

  selectsHousingType.addEventListener('change', onFormSelectHousingTypeChange);
})();
