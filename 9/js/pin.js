'use strict';
(function () {
  var SHIFT_PIN_X = 25;
  var SHIFT_PIN_Y = 70;
  var ADS_COUNT = 5;

  // ----- Функция слушателя записывающая айди пина
  var toClosure = function (adObject) {
    return function handler() {
      window.generateCard(adObject);
    };
  };

  // ----- Функция вывода пинов на карту
  var drawPins = function (ads) {
    var templatePin = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();
    // -----  Уменьшаю выводимый массив до нужного
    var slicedAds = ads.slice(0, ADS_COUNT);
    for (var i = 0; i < slicedAds.length; i++) {
      var element = templatePin.cloneNode(true);
      element.classList.add('drawn__pin');
      element.style.left = slicedAds[i].location.x - SHIFT_PIN_X + 'px';
      element.style.top = slicedAds[i].location.y - SHIFT_PIN_Y + 'px';
      element.children[0].src = slicedAds[i].author.avatar;
      element.children[0].alt = slicedAds[i].offer.title;
      fragment.appendChild(element);

      // Добавляю слушателя по клику чтобы записать айди пина
      element.addEventListener('click', toClosure(slicedAds[i]));
    }
    return window.utils.mapArea.appendChild(fragment);
  };
  window.drawPins = drawPins;
})();
