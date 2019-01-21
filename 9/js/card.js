'use strict';
(function () {
  // ----- Функция для наполнения карточки объекта
  var generateCard = function (ad) {
    var addedCard = window.utils.map.querySelector('.map__card, .popup');
    if (addedCard) {
      addedCard.remove();
    }
    var templateCard = document.querySelector('#card').content.querySelector('article');
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    // ----- Мапа для типов
    var adTypesMap = {
      bungalo: 'Бунгало',
      flat: 'Квартира',
      house: 'Дом',
      palace: 'Дворец'
    };
    card.querySelector('.popup__type').textContent = adTypesMap[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent =
      ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent =
      'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    // ----- Удаляю список
    card.querySelector('.popup__features').remove();

    // ----- Создаю новый список
    var newUl = document.createElement('ul');
    newUl.classList.add('popup__features');

    // ----- Создаю строки в списке на основе массива фичей из первого объекта
    for (var k = 0; k < ad.offer.features.length; k++) {
      var newLi = document.createElement('li');
      newLi.classList.add('popup__feature');
      newLi.classList.add('popup__feature--' + ad.offer.features[k]);
      newUl.appendChild(newLi);
    }
    card.insertBefore(newUl, card.querySelector('.popup__description'));

    // ----- Описание объекта
    card.querySelector('.popup__description').textContent = ad.offer.description;

    // ----- Вывод фотографий
    card.querySelector('.popup__photo').src = ad.offer.photos[0];
    var photosCard = card.querySelector('.popup__photo');
    for (var p = 1; p < ad.offer.photos.length; p++) {
      var dupPhotosCard = photosCard.cloneNode(true);
      dupPhotosCard.src = ad.offer.photos[p];
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

  window.generateCard = generateCard;
})();
