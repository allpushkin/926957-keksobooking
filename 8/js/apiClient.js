'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.objectList = xhr.response;
        onSuccess(xhr.response);
      } else {
        onError('Ошибка загрузки данных. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.send();
  };
})();

