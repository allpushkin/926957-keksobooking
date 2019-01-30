'use strict';
(function () {
  var FILTER_TYPE_ANY = 'any';
  var FILTER_PRICE_LOW = 'low';
  var FILTER_PRICE_MIDDLE = 'middle';
  var FILTER_PRICE_HIGH = 'high';
  var FILTER_PRICE_LOW_VALUE = '10000';
  var FILTER_PRICE_HIGH_VALUE = '50000';

  // ----- Переменные для фильтрации пинов на карте
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterType = mapFilters.querySelector('#housing-type');
  var mapFilterPrice = mapFilters.querySelector('#housing-price');
  var mapFilterRooms = mapFilters.querySelector('#housing-rooms');
  var mapFilterGuests = mapFilters.querySelector('#housing-guests');
  var mapFilterFeatures = mapFilters.querySelectorAll('.map__checkbox');

  var filters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };

  var removePinsCard = function () {
    var addedCard = window.utils.map.querySelector('.map__card, .popup');
    if (addedCard) {
      addedCard.remove();
    }
    var drawnPins = window.utils.mapArea.querySelectorAll('.drawn__pin');
    drawnPins.forEach(function (element) {
      element.parentNode.removeChild(element);
    }
    );
  };

  var checkAdPrice = function (selectedPrice, adPrice) {
    switch (selectedPrice) {
      case FILTER_PRICE_LOW:
        return adPrice > FILTER_PRICE_LOW_VALUE;
      case FILTER_PRICE_MIDDLE:
        return adPrice < FILTER_PRICE_LOW_VALUE || adPrice > FILTER_PRICE_HIGH_VALUE;
      case FILTER_PRICE_HIGH:
        return adPrice < FILTER_PRICE_HIGH_VALUE;
      default:
        return false;
    }
  };

  var filterPins = function () {
    var filteredAds = window.map.allAds.filter(function (ad) {
      if (filters.type !== FILTER_TYPE_ANY && ad.offer.type !== filters.type) {
        return false;
      } else if (filters.price !== FILTER_TYPE_ANY && checkAdPrice(mapFilterPrice.value, ad.offer.price)) {
        return false;
      } else if (filters.rooms !== FILTER_TYPE_ANY && ad.offer.rooms.toString() !== filters.rooms) {
        return false;
      } else if (filters.guests !== FILTER_TYPE_ANY && ad.offer.guests.toString() !== filters.guests) {
        return false;
      } else if (filters.features.some(function (feature) {
        return ad.offer.features.indexOf(feature) === -1;
      })) {
        return false;
      }
      return true;
    });
    return filteredAds;
  };

  mapFilterType.addEventListener('change', function (evt) {
    filters.type = evt.target.value;
    removePinsCard();
    window.drawPins(filterPins());
  });
  mapFilterPrice.addEventListener('change', function (evt) {
    filters.price = evt.target.value;
    removePinsCard();
    window.drawPins(filterPins());
  });
  mapFilterRooms.addEventListener('change', function (evt) {
    filters.rooms = evt.target.value;
    removePinsCard();
    window.drawPins(filterPins());
  });
  mapFilterGuests.addEventListener('change', function (evt) {
    filters.guests = evt.target.value;
    removePinsCard();
    window.drawPins(filterPins());
  });
  mapFilterFeatures.forEach(function (checkbox) {
    checkbox.addEventListener('input', function (evt) {
      if (evt.target.checked) {
        filters.features.push(evt.target.value);
      } else {
        var index = filters.features.indexOf(evt.target.value);
        if (index >= 0) {
          filters.features.splice(index, 1);
        }
      }
      removePinsCard();
      window.drawPins(filterPins());
    });
  });
})();
