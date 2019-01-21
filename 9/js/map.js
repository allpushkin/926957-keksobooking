'use strict';
(function () {
  window.main = document.querySelector('main');
  var inputFields = window.utils.notice.querySelectorAll('fieldset');
  var adForm = document.querySelector('.ad-form');
  var mapFilterFields = document.querySelectorAll('.map__filter');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 87;
  var MAP_TOP = 130;
  var MAP_BOTTOM = 630;
  // var ADS_COUNT = 5;

  var adCoords = {
    x: Math.round(mainPin.offsetLeft + PIN_WIDTH / 2),
    y: Math.round(mainPin.offsetTop + PIN_HEIGHT / 2)
  };

  // ----- Функция при загрузке данных. Обрезает массив и передает его в функцию отрисовки пинов
  var onSuccess = function (adsArray) {
    window.allAds = adsArray;
    window.drawPins(adsArray);
  };
  // ----- Функция вывода ошибки при загрузке данных
  var showError = function (text) {
    var errorMessage = document.querySelector('#error').content.querySelector('.error');
    errorMessage.firstChild.textContent = text;
    window.main.appendChild(errorMessage);
  };

  // ----- Заполнить инпут адреса координатой метки
  window.utils.fillAddressField(adCoords.x, adCoords.y);

  // ----- Функция чтобы задизейблить или раздизейблить поля
  var toggleFieldsDisabled = function (fields, status) {
    for (var i = 0; i < fields.length; i++) {
      fields[i].disabled = status;
    }
  };

  // ----- Функция перевода в неактивное состояние
  var disablePageState = function () {
    toggleFieldsDisabled(inputFields, true);
    toggleFieldsDisabled(mapFilterFields, true);
  };

  disablePageState();

  // ----- Функция перевода в активное состояние
  var enablePageState = function () {
    window.utils.map.classList.remove('map--faded');
    toggleFieldsDisabled(mapFilterFields, false);
    adForm.classList.remove('ad-form--disabled');
    toggleFieldsDisabled(inputFields, false);
  };
  var pinsAreDrawn = false;
  // ----- Перемещение главной метки
  mainPin.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    var pinCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: pinCoords.x - moveEvt.clientX,
        y: pinCoords.y - moveEvt.clientY
      };
      pinCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newPinTop = mainPin.offsetTop - shift.y;
      var newPinLeft = mainPin.offsetLeft - shift.x;
      var rect = mapPins.getBoundingClientRect();

      if (newPinTop < MAP_TOP) {
        newPinTop = MAP_TOP;
      } else if (newPinTop > MAP_BOTTOM) {
        newPinTop = MAP_BOTTOM;
      }
      if (newPinLeft < 0) {
        newPinLeft = 0;
      } else if (newPinLeft > rect.width - PIN_WIDTH) {
        newPinLeft = rect.width - PIN_WIDTH;
      }
      mainPin.style.top = newPinTop + 'px';
      mainPin.style.left = newPinLeft + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!pinsAreDrawn) {
        window.load(onSuccess, showError);
        pinsAreDrawn = true;
      }
      adCoords.x = pinCoords.x;
      adCoords.y = pinCoords.y;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      enablePageState();
      window.utils.fillAddressField(adCoords.x, adCoords.y);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
