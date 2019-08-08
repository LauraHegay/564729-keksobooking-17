'use strict';
// функционал заполнения и отображения карточки
(function () {
  var translateOfferType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var getOfferFeatures = function (features, element) {
    var similarListFeatures = document.querySelector('.popup__features');
    element.querySelector('.popup__features').textContent = '';
    var featuresAllElement = document.createDocumentFragment();
    features.forEach(function (feature) {
      var elementLi = document.createElement('li');
      elementLi.classList.add('popup__feature popup__feature--' + feature);
      featuresAllElement.appendChild(elementLi);
    });
    similarListFeatures.appendChild(featuresAllElement);
  };
  var createImg = function (path) {
    var elementImg = document.createElement('img');
    elementImg.classList.add('popup__photo');
    elementImg.src = path;
    elementImg.width = 45;
    elementImg.height = 40;
  };
  var getOfferPhotos = function (photos, element) {
    var similarListPhotos = document.querySelector('.popup__photos');
    var photosAllElement = document.createDocumentFragment();
    element.querySelector('.popup__photos').textContent = '';
    photos.forEach(function (photo) {
      var img = createImg(photo);
      photosAllElement.appendChild(img);
      photosAllElement.querySelector('img').src = photo; // не уверена, что эта строка будет работать
    });
    similarListPhotos.appendChild(photosAllElement);
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
    createCard: createCard,
    showCard: showCard,
    hideAd: hideAd
  };
})();
