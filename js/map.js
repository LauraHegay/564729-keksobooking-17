'use strict';
// модуль, который управляет карточками объявлений и пинами:
// добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var NUMBER_PINS = 5;
  var ESC_KEYCODE = 27;
  var adTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var map = document.querySelector('.map');
  var advertisments = [];
  var renderedAds = [];

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
      onPinsClick(advertisments);
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
  var onKeyDown;
  var similarListElement = document.querySelector('.map__pins');
  var deleteOpenCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };
  var cardOpen = function () {
    var elementOpen = document.querySelector('.map__card');
    if (elementOpen) {
      deleteOpenCard();
    }
  };
  var doCardJob = function (pinId, data) {
    cardOpen();
    var newCard = window.card.createCard(data[pinId]);
    map.insertBefore(newCard, similarListElement);
  };
  var onPinsClick = function (data) {
    var pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pinsList.length; j++) {
      pinsList[j].addEventListener('click', function (evt) {
        var button = evt.currentTarget;
        var pinId = button.getAttribute('data-id');

        var buttons = document.querySelectorAll('.map__pin:not(.map__pin--main)');
        buttons.forEach(function (element) {
          element.classList.remove('map__pin--active');
        });

        button.classList.add('map__pin--active');

        doCardJob(pinId, data);

        var popupCloseButton = document.querySelector('.popup__close');

        popupCloseButton.addEventListener('click', function () {
          buttons.forEach(function (element) {
            element.classList.remove('map__pin--active');
          });

          deleteOpenCard();
          document.removeEventListener('keydown', onKeyDown);
        });

        onKeyDown = function (keyEvt) {
          buttons.forEach(function (element) {
            element.classList.remove('map__pin--active');
          });

          if (document.querySelectorAll('.map__pin:not(.map__pin--main)') && keyEvt.keyCode === ESC_KEYCODE) {
            deleteOpenCard();
            document.removeEventListener('keydown', onKeyDown);
          }
        };

        document.addEventListener('keydown', onKeyDown);
      });
    }
  };
  window.map = {
    // функция заполнения блока DOM-элементами на основе массива JS-объектов.
    addAds: addAds,
    renderAds: renderAds,
    getAds: getAds,
    onError: onError,
    onSuccess: onSuccess
  };
})();
