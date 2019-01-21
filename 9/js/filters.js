'use strict';
(function () {

  var FILTER_TYPE_ANY = 'any';
  // ----- Переменные для фильтрации пинов на карте
  var mapFilters = document.querySelector('.map__filters');
  var typeMapFilter = mapFilters.querySelector('#housing-type');

  typeMapFilter.addEventListener('change', function (evt) {
    if (evt.currentTarget.value === FILTER_TYPE_ANY) {
      var filteredAds = window.allAds;
    } else {
      filteredAds = window.allAds.filter(function (ad) {
        return ad.offer.type === evt.currentTarget.value;
      });
    }
    var addedCard = window.utils.map.querySelector('.map__card, .popup');
    if (addedCard) {
      addedCard.remove();
    }

    var drawnPins = window.utils.mapArea.querySelectorAll('.drawn__pin');

    drawnPins.forEach(function (element) {
      element.parentNode.removeChild(element);
    }
    );

    window.drawPins(filteredAds);
  }
  );

})();
