'use strict';
// модуль, который управляет карточками объявлений и пинами:
// добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var NUMBER_PINS = 5;
  var ESC_KEYCODE = 27;
  var adTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarListElement = document.querySelector('.map__pins');
  var advertisments = [];
  var renderedAds = [];
  // функция создания DOM-элемента на основе JS-объекта,
  var onError = function () {
    var errorContainer = document.querySelector('main');
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error').cloneNode(true);

    errorContainer.appendChild(errorTemplate);

    var onErrorClose = function (evt) {
      if (evt.type === 'click') {
        errorContainer.removeChild(errorTemplate);
      } else if (evt.type === 'keydown') {
        if (evt.keyCode === ESC_KEYCODE) {
          errorContainer.removeChild(errorTemplate);
        }
      }
      document.removeEventListener('click', onErrorClose);
      document.removeEventListener('keydown', onErrorClose);
    };
    document.addEventListener('click', onErrorClose);
    document.addEventListener('keydown', onErrorClose);
  };
  var getAdTemplate = function (ad) {
    var template = adTemplateElement.cloneNode(true);
    template.querySelector('img').src = ad.author.avatar;
    template.querySelector('img').alt = ad.offer.title;
    template.style.top = ad.location.y - PIN_HEIGHT + 'px';
    template.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    return template;
  };

  var loadAds = function (cb) {
    window.load(function (data) {
      advertisments = data;
      cb(advertisments);
    }, onError);
  };

  var removeAds = function (ads) {
    ads.forEach(function (ad) {
      ad.remove();
    });
  };

  var renderAds = function (data) {
    var numberPins = data.length > NUMBER_PINS ? NUMBER_PINS : data.length;
    data = data.slice(0, numberPins);
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
