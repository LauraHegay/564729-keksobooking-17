'use strict';
// модуль, который управляет карточками объявлений и пинами:
// добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var NUMBER_PINS = 5;
  var adTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarListElement = document.querySelector('.map__pins');
  var advertisments = [];
  var renderedAds = [];
  // функция создания DOM-элемента на основе JS-объекта,
  var getAdTemplate = function (ad) {
    var template = adTemplateElement.cloneNode(true);
    template.querySelector('img').src = ad.author.avatar;
    template.style.top = ad.location.y - PIN_HEIGHT + 'px';
    template.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    return template;
  };

  var loadAds = function (cb) {
    window.load(function (data) {
      advertisments = data;
      cb(advertisments);
    });
  };

  var removeAds = function (ads) {
    ads.forEach(function (ad) {
      ad.remove();
    });
  };

  var renderAds = function (data) {
    data = data.slice(0, NUMBER_PINS);
    if (renderedAds.length) {
      removeAds(renderedAds);
      renderedAds = [];
    }
    var annoucementAllElement = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var ad = data[i];
      var adElement = getAdTemplate(ad);
      renderedAds.push(adElement);
      annoucementAllElement.appendChild(adElement);
    }
    similarListElement.appendChild(annoucementAllElement);
  };

  var addAds = function () {
    loadAds(function (ads) {
      renderAds(ads);
    });
  };

  var getAds = function () {
    return advertisments;
  };

  window.map = {
    // функция заполнения блока DOM-элементами на основе массива JS-объектов.
    addAds: addAds,
    renderAds: renderAds,
    getAds: getAds
  };
})();
