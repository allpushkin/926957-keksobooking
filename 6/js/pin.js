'use strict'
//
//
//
//
// —————————————————————— pin.js
;(function () {
  var SHIFT_PIN_X = 25;
  var SHIFT_PIN_Y = 70;

  // ----- Функция слушателя записывающая айди пина
  var toClosure = function (j) {
    return function handler() {
      window.card(window.data[j]);
    };
  };

  // ----- Функция вывода пинов на карту
  var drawPins = function (objects) {
    var templatePin = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < objects.length; i++) {
      var element = templatePin.cloneNode(true);
      element.style.left = objects[i].location.x + SHIFT_PIN_X + 'px';
      element.style.top = objects[i].location.y + SHIFT_PIN_Y + 'px';
      element.children[0].src = objects[i].author.avatar;
      element.children[0].alt = objects[i].offer.title;
      fragment.appendChild(element);

      // Добавляю слушателя по клику чтобы записать айди пина
      element.addEventListener('click', toClosure(i));
    }
    return window.utils.mapArea.appendChild(fragment);
  };
  window.pins = drawPins;
})();
