'use strict';
(function () {
  var formFilter = document.querySelector('.map__filters');
  var filters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };
  var priceMap = {
    'low': function (price) {
      return price < 10000;
    },
    'middle': function (price) {
      return price >= 10000 && price <= 50000;
    },
    'high': function (price) {
      return price > 50000;
    }
  };

  var applyToArray = function (elements, value) {
    var index = elements.indexOf(value);
    if (index === -1) {
      return elements.push(value);
    }
    return elements.splice(index, 1);
  };

  var isAny = function (value) {
    return value === 'any';
  };

  var checkType = function (type) {
    return isAny(filters.type) || type === filters.type;
  };

  var checkPrice = function (price) {
    return isAny(filters.price) || priceMap[filters.price](price);
  };

  var checkRooms = function (rooms) {
    return isAny(filters.rooms) || rooms === filters.rooms;
  };

  var checkGuests = function (guests) {
    return isAny(filters.guests) || guests === filters.guests;
  };

  var checkFeatures = function (features) {
    // return features.every(function (item) {
    //   return filters.features.includes(item);
    // });
    return true;
  };

  var filter = function (ads) {
    var adsToRender = ads.filter(function (ad) {
      var show = checkType(ad.offer.type);
      show = show && checkPrice(ad.offer.price);
      show = show && checkRooms(ad.offer.rooms);
      show = show && checkGuests(ad.offer.guests);
      show = show && checkFeatures(ad.offer.features);

      return show;
    });
    return adsToRender;
  };
  var onFilterFormChanged = function (evt) {
    var name = evt.target.name;
    var value = evt.target.value;

    if (name === 'features') {
      applyToArray(filters.features, value);
    } else {
      if ((name === 'rooms' || name === 'guests') && value !== 'any') {
        value = parseInt(value, 10);
      }
      filters[name] = value;
    }

    var adsToRender = filter(window.map.getAds());
    window.map.renderAds(adsToRender);
  };

  formFilter.addEventListener('change', window.debounce(onFilterFormChanged));
})();
