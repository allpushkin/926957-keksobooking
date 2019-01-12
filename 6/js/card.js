'use strict'
//
//
//
//
// —————————————————————— card.js
;(function () {
  // ----- Функция для наполнения карточки объекта
  var generateCard = function (object) {
    var addedCard = window.utils.map.querySelector('.map__card, .popup');
    if (addedCard) {
      addedCard.remove();
    }
    var templateCard = document.querySelector('#card').content.querySelector('article');
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__title').textContent = object.offer.title;
    card.querySelector('.popup__text--address').textContent = object.offer.address;
    card.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
    // ----- Мапа для типов
    var objectTypesMap = {
      bungalo: 'Бунгало',
      flat: 'Квартира',
      house: 'Дом',
      palace: 'Дворец'
    };
    card.querySelector('.popup__type').textContent = objectTypesMap[object.offer.type];
    card.querySelector('.popup__text--capacity').textContent =
      object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent =
      'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;

    // ----- Удаляю список
    card.querySelector('.popup__features').remove();

    // ----- Создаю новый список
    var newUl = document.createElement('ul');
    newUl.classList.add('popup__features');

    // ----- Создаю строки в списке на основе массива фичей из первого объекта
    for (var k = 0; k < object.offer.features.length; k++) {
      var newLi = document.createElement('li');
      newLi.classList.add('popup__feature');
      newLi.classList.add('popup__feature--' + object.offer.features[k]);
      newUl.appendChild(newLi);
    }
    card.insertBefore(newUl, card.querySelector('.popup__description'));

    // ----- Описание объекта
    card.querySelector('.popup__description').textContent = object.offer.description;

    // ----- Вывод фотографий
    card.querySelector('.popup__photo').src = object.offer.photos[0];
    var photosCard = card.querySelector('.popup__photo');
    for (var p = 1; p < object.offer.photos.length; p++) {
      var dupPhotosCard = photosCard.cloneNode(true);
      dupPhotosCard.src = object.offer.photos[p];
      card.querySelector('.popup__photos').appendChild(dupPhotosCard);
    }

    // ----- Возвращаю вывод на страницу
    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', closeCard);
    window.utils.map.insertBefore(card, window.utils.map.querySelector('.map__filters-container'));
  };

  // ----- Функция закрытия карточки
  function closeCard() {
    var addedCard = window.utils.map.querySelector('.map__card');
    addedCard.remove();
  }

  window.card = generateCard;
})();
