'use strict'
//
//
//
// —————————————————————— utils.js
;(function () {
  var map = document.querySelector('.map');
  var mapArea = document.querySelector('.map__pins');
  var notice = document.querySelector('.notice');
  var addressField = notice.querySelector('#address');

  // ----- Функция ввода адреса
  var fillAddressField = function (x, y) {
    addressField.value = x + ', ' + y;
  };
  window.utils = {
    map: map,
    mapArea: mapArea,
    notice: notice,
    fillAddressField: fillAddressField
  };
})();
