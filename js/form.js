'use strict';
(function () {
  var BUNGALO_MIN_PRICE = '0';
  var FLAT_MIN_PRICE = '1000';
  var HOUSE_MIN_PRICE = '5000';
  var PALACE_MIN_PRICE = '10000';

  var form = window.utils.notice.querySelector('.ad-form');
  // ----- Функция при удачной отправке данных
  var onSuccess = function () {
    window.utils.main.appendChild(successMessage);
    window.pageReset();
    var successPopup = document.querySelector('.success');
    window.utils.closeSuccessPopup(successPopup);

  };
  // ----- Функция вывода ошибки при передаче данных и закрытия окна
  var showError = function (text) {
    var errorMessage = document.querySelector('#error').content.querySelector('.error');
    var errorMessageClone = errorMessage.cloneNode(true);
    errorMessage.children[0].textContent = text;
    window.utils.main.appendChild(errorMessageClone);
    var errorButton = document.querySelector('.error__button');
    var errorPopup = document.querySelector('.error');
    window.utils.closeErrorPopup(errorPopup, errorButton);
  };
  // ----- Мапа для мин цены в зависимости от типа
  var typeSelect = window.utils.notice.querySelector('#type');
  var priceField = window.utils.notice.querySelector('#price');
  var TypePriceMap = {
    bungalo: BUNGALO_MIN_PRICE,
    flat: FLAT_MIN_PRICE,
    house: HOUSE_MIN_PRICE,
    palace: PALACE_MIN_PRICE
  };

  // ----- Изменение мин стоимости от типа объекта
  typeSelect.addEventListener('change', function (evt) {
    priceField.placeholder = TypePriceMap[evt.target.value];
    priceField.min = TypePriceMap[evt.target.value];
  });

  // ----- Функция обновления мин стоимости жилья на дефолтное
  var resetPriceField = function (propertyType) {
    priceField.min = TypePriceMap[propertyType];
    priceField.placeholder = TypePriceMap[propertyType];
  };

  window.resetPriceField = resetPriceField;

  // ----- Автоподставление времени заезда/выезда
  var timeIn = window.utils.notice.querySelector('#timein');
  var timeOut = window.utils.notice.querySelector('#timeout');

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  // ----- Ограничение на количество комнат и количество гостей
  var roomNumber = window.utils.notice.querySelector('#room_number');
  var capacity = window.utils.notice.querySelector('#capacity');

  roomNumber.addEventListener('change', function (evt) {
    var value = Number(evt.target.value);
    var capacityValue = Number(capacity.value);
    evt.target.setCustomValidity('');
    if (value === 1 && capacityValue !== 1) {
      capacity.setCustomValidity('В одну комнату может заселиться только один гость');
    } else if (value === 2 && capacityValue < 1 || capacityValue > 2) {
      capacity.setCustomValidity('В две комнаты могут заселиться только двое или один гость');
    } else if (value === 3 && capacityValue <= 0) {
      capacity.setCustomValidity('В три комнаты поместятся один, два или три гостя');
    } else if (value === 100 && capacityValue > 0) {
      capacity.setCustomValidity('Стокомнатная недвижимость не для гостей!');
    }
  });
  capacity.addEventListener('change', function (evt) {
    var value = Number(evt.target.value);
    var roomNumberValue = Number(roomNumber.value);
    evt.target.setCustomValidity('');
    if (value === 1 && roomNumberValue !== 1) {
      roomNumber.setCustomValidity('Для одного гостя подойдет одна, две или три комнаты');
    } else if (value === 2 && roomNumberValue < 2 || roomNumberValue >= 100) {
      roomNumber.setCustomValidity('Для двух гостей будут впору две или три комнаты');
    } else if (value === 3 && roomNumberValue !== 3) {
      roomNumber.setCustomValidity('Трём гостям подойдут трёхкомнатные помещения');
    } else if (value === 0 && roomNumberValue !== 100) {
      roomNumber.setCustomValidity('Не для гостей можно выбрать только сто комнат!');
    }
  });

  // ----- Отправка формы
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    if (form.checkValidity()) {
      window.send(formData, onSuccess, showError);
    } else {
      window.utils.main.appendChild(errorMessage);
    }
  });
})();
