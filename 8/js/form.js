'use strict';
(function () {
  var form = window.utils.notice.querySelector('.ad-form');

  // ----- Мапа для мин цены в зависимости от типа
  var typeSelect = window.utils.notice.querySelector('#type');
  var priceField = window.utils.notice.querySelector('#price');
  var typePriceMap = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  // ----- Изменение мин стоимости от типа объекта
  typeSelect.addEventListener('change', function (evt) {
    priceField.placeholder = typePriceMap[evt.target.value];
    priceField.min = typePriceMap[evt.target.value];
  });

  // ----- Автоподставление времени заезда/выезда
  var timeIn = window.utils.notice.querySelector('#timein');
  var timeOut = window.utils.notice.querySelector('#timeout');

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  // ----- Реакция на отправку формы
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (form.checkValidity()) {
      window.main.appendChild(successMessage);
    } else {
      window.main.appendChild(errorMessage);
    }
  });
})();
