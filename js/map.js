'use strict';
// модуль, который управляет карточками объявлений и пинами:
// добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var NUMBER_PINS = 5;
  var ESC_KEYCODE = 27;
  var adTemplatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarListElement = document.querySelector('.map__pins');
  var advertisments = [];
  var renderedAds = [];
  var pins = [];
  var currentPin = null;

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
  var onSuccess = function () {
    var successContainer = document.querySelector('main');
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success').cloneNode(true);

    successContainer.appendChild(successTemplate);

    var onSuccessClose = function (evt) {

      if (evt.type === 'click') {
        successContainer.removeChild(successTemplate);
      } else if (evt.type === 'keydown') {
        if (evt.keyCode === ESC_KEYCODE) {
          successContainer.removeChild(successTemplate);
        }
      }
      document.removeEventListener('click', onSuccessClose);
      document.removeEventListener('keydown', onSuccessClose);
    };
    document.addEventListener('click', onSuccessClose);
    document.addEventListener('keydown', onSuccessClose);
  };

  // Функция getAdTemplate принимает на вход один параметр
  // ad – кажется это данные об одном объявлении
  // функция возвращает заполненный фрагмент кода
  var getAdTemplate = function (ad, index) {
    var template = adTemplatePin.cloneNode(true); // копируем шаблон пина объявления

    template.dataset.index = index;
    template.querySelector('img').src = ad.author.avatar; // в шаблоне меняем src, alt, top, left
    template.querySelector('img').alt = ad.offer.title;
    template.style.top = ad.location.y - PIN_HEIGHT + 'px';
    template.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    return template;
  };

  // Функция loadAds колбек функция
  // Никак не пойму зачем она нужно)))
  // Внутри вызывается функция window.load параметром которой передается безымянная  функция
  // В безымянную функцию передаются data – это данные загруженные с сервера
  // Данные запоминаем в переменную advertisments
  // Передаем эти данные в колбек функцию, звучит вообще не понятно и может быть не правильно
  // Еще один параметр  onError – действия при возникновении  ошибки
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
  var onPictureClick = function (evt) {
    // Уменьшаем число перерисовок
    if (isActive(pin)) {
      return;
    }
    var pin = evt.currentTarget;
    activatePin(pin);
    var pinData = pin.dataset.index;
    window.card.showCard(pinData, pin);
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
      var adElement = getAdTemplate(ad, i);
      adElement.addEventListener('click', onPictureClick);
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


  var activatePin = function (pin) {
    if (currentPin) {
      currentPin.classList.remove('active');
    }
    currentPin = pin;
    pin.classList.add('active');
  };

  var isActive = function (pin) {
    return pin === currentPin;
  };

  var deactivatePin = function (pin) {
    if (isActive(pin)) {
      pin.classList.remove('active');
    }
  };


  var getPin = function () {
    var pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsList.length; i++) {
      pinsList[i].dataset.index = i;
      pinsList[i].addEventListener('click', onPinClick);
    }
  };
  getPin();
  window.map = {
    addAds: addAds,
    renderAds: renderAds,
    getAds: getAds,
    onError: onError,
    onSuccess: onSuccess
  };
})();
