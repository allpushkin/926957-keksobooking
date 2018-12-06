/* eslint-disable strict */
'use strict';

var map = document.querySelector('.map');
var mapArea = document.querySelector('.map__pins');

map.classList.remove('map--faded');

/* ----- Определяю вспомогательные переменные для генерации объектов */
var getRandomValue = function (start, end) {
  return Math.floor(Math.random() * end + start);
};

var typesList = ['palace', 'flat', 'house', 'bungalo'];

var checkInOutTime = ['12:00', '13:00', '14:00'];

var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var photosList = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var titlesList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var avatarNumbers = [];

for (var avatarCount = 1; avatarCount <= 8; avatarCount++) {
  avatarNumbers.push(avatarCount);
}

/* ----- Генерирую массив случайных объявлений */
var objectArray = [];

for (var i = 0; i < 8; i++) {
  var randomIndex = getRandomValue(0, avatarNumbers.length - 1);
  var randomStringNumber = getRandomValue(0, titlesList.length);
  var locationX = getRandomValue(1, mapArea.scrollWidth);
  var locationY = getRandomValue(130, 630);
  var featuresListRandom = getRandomValue(0, featuresList.length - 1);

  objectArray.push({
    author: {
      avatar: 'img/avatars/user0' + avatarNumbers[randomIndex] + '.png'
    },
    offer: {
      title: titlesList.splice(randomStringNumber, 1)[0],
      address: locationX + ', ' + locationY,
      price: getRandomValue(1000, 1000000),
      type: typesList[getRandomValue(0, typesList.length - 1)],
      rooms: getRandomValue(1, 5),
      guests: getRandomValue(1, 8),
      checkin: checkInOutTime[getRandomValue(0, 2)],
      checkout: checkInOutTime[getRandomValue(0, 2)],
      features: featuresList.slice(0, featuresListRandom),
      description: '',
      photos: photosList
    },
    location: {
      x: locationX,
      y: locationY
    }
  });
  avatarNumbers.splice(randomIndex, 1);
}

/* ----- Вывожу пины на карту */
var templatePin = document.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();

for (var pinCount = 0; pinCount < objectArray.length; pinCount++) {
  var element = templatePin.cloneNode(true);
  element.style.left = objectArray[pinCount].location.x + 50 * 0.5 + 'px';
  element.style.top = objectArray[pinCount].location.y + 70 + 'px';
  element.children[0].src = objectArray[pinCount].author.avatar;
  element.children[0].alt = objectArray[pinCount].offer.title;
  fragment.appendChild(element);
}
mapArea.appendChild(fragment);

/* ----- Наполняю карточку данными сгенерированного объекта */
var card = document.querySelector('#card').content.querySelector('article');

card.querySelector('.popup__title').textContent = objectArray[0].offer.title;
card.querySelector('.popup__text--address').textContent = objectArray[0].offer.address;
card.querySelector('.popup__text--price').textContent = objectArray[0].offer.price + '₽/ночь';

if (objectArray[0].offer.type === 'bungalo') {
  card.querySelector('.popup__type').textContent = 'Бунгало';
}
if (objectArray[0].offer.type === 'flat') {
  card.querySelector('.popup__type').textContent = 'Квартира';
}
if (objectArray[0].offer.type === 'house') {
  card.querySelector('.popup__type').textContent = 'Дом';
}
if (objectArray[0].offer.type === 'palace') {
  card.querySelector('.popup__type').textContent = 'Дворец';
}

card.querySelector('.popup__text--capacity').textContent =
  objectArray[0].offer.rooms + ' комнаты для' + objectArray[0].offer.guests + ' гостей';

card.querySelector('.popup__text--time').textContent =
  'Заезд после ' + objectArray[0].offer.checkin + ', выезд до ' + objectArray[0].offer.checkout;

/* ----- Удаляю список */
card.querySelector('.popup__features').remove();

/* ----- Создаю новый список */
var newUl = document.createElement('ul');
newUl.className = 'popup__features';

/* ----- Создаю строки в списке на основе массива фичей из первого объекта*/
for (var k = 0; k < objectArray[0].offer.features.length; k++) {
  var newLi = document.createElement('li');
  newLi.className = 'popup__feature popup__feature--' + objectArray[0].offer.features[k];
  newUl.appendChild(newLi);
}

/* ----- Вставляется в конец, почемууууууууу */
card.insertBefore(newUl, card.querySelector('.popup__description'));

/* ----- Описание объекта */
card.querySelector('.popup__description').textContent = objectArray[0].offer.description;

/* ----- Вывод фотографий */
card.querySelector('.popup__photo').src = objectArray[0].offer.photos[0];
var photosCard = card.querySelector('.popup__photo');

for (var p = 1; p < objectArray[0].offer.photos.length; p++) {
  var dupPhotosCard = photosCard.cloneNode(true);
  dupPhotosCard.src = objectArray[0].offer.photos[p];
  card.querySelector('.popup__photos').appendChild(dupPhotosCard);
}

/* ----- Вывожу карточку на страницу */
map.insertBefore(card, map.querySelector('.map__filters-container'));
