'use strict';
// функционал заполнения и отображения карточки
(function () {
  var translateOfferType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var getOfferFeatures = function (features, element) {
    element.querySelector('.popup__features').innerHTML = '';
    for (var j = 0; j < features.length; j++) {
      var elementLi = document.createElement('li');
      elementLi.setAttribute('class', ('popup__feature popup__feature--' + features[j]));
      element.querySelector('.popup__features').appendChild(elementLi);
    }
  };
  var getOfferPhotos = function (photos, element) {
    element.querySelector('.popup__photos').innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
      var elementImg = document.createElement('img');
      elementImg.setAttribute('class', 'popup__photo');
      elementImg.setAttribute('src', photos[i]);
      elementImg.setAttribute('width', 45);
      elementImg.setAttribute('height', 40);
      element.querySelector('.popup__photos').appendChild(elementImg);
      element.querySelector('.popup__photos').querySelector('img').src = photos[i];
    }
  };
  var createCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = translateOfferType[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    if (card.offer.features.length) {
      getOfferFeatures(card.offer.features, cardElement);
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__features'));
    }

    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    if (card.offer.photos.length) {
      getOfferPhotos(card.offer.photos, cardElement);
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__photos'));
    }
    return cardElement;
  };

  window.card = {
    createCard: createCard
  };
})();
