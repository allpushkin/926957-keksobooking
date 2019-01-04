'use strict';

var map = document.querySelector('.map');
var mapArea = document.querySelector('.map__pins');

var PIN_WIDTH = 65;
var PIN_HEIGHT = 87;
var SHIFT_PIN_X = 25;
var SHIFT_PIN_Y = 70;

var main = document.querySelector('main');
var mainPin = document.querySelector('.map__pin--main');
var mapFilterFields = document.querySelectorAll('.map__filter');
var adForm = document.querySelector('.ad-form');
var notice = document.querySelector('.notice');
var inputFields = notice.querySelectorAll('fieldset');
var addressForm = notice.querySelector('#address');

var form = notice.querySelector('.ad-form');

var pinCoordinates = {
  x: Math.round(mainPin.offsetLeft + PIN_WIDTH / 2),
  y: Math.round(mainPin.offsetTop + PIN_HEIGHT / 2)
};

// ----- Функция ввода адреса
var fillAddressField = function () {
  addressForm.value = pinCoordinates.x + ', ' + pinCoordinates.y;
};

fillAddressField();

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
  map.classList.remove('map--faded');
  toggleFieldsDisabled(mapFilterFields, false);
  adForm.classList.remove('ad-form--disabled');
  toggleFieldsDisabled(inputFields, false);
};

// ----- Функция генерации случайного числа от и до
var getRandomValue = function (start, end) {
  return Math.floor(Math.random() * end + start);
};
// ----- Функция для генерации массива объектов
var generateObjectList = function () {
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

  // ----- Генерирую массив случайных объявлений
  var objects = [];

  for (var i = 0; i < 8; i++) {
    var randomIndex = getRandomValue(0, avatarNumbers.length - 1);
    var randomStringNumber = getRandomValue(0, titlesList.length);
    var locationX = getRandomValue(1, mapArea.scrollWidth);
    var locationY = getRandomValue(130, 630);
    var featuresListRandom = getRandomValue(0, featuresList.length - 1);

    objects.push({
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
  return objects;
};

// ----- Запускаю функцию генерации объектов
var objectList = generateObjectList();

// ----- Функция слушателя записывающая айди пина
var toClosure = function (j) {
  return function handler() {
    generateCard(objectList[j]);
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
  return mapArea.appendChild(fragment);
};

// ----- Функция для наполнения карточки объекта
var generateCard = function (object) {
  var addedCard = map.querySelector('.map__card, .popup');
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
  closeButton.addEventListener('click', closePopup);
  map.insertBefore(card, map.querySelector('.map__filters-container'));
};

// ----- Функция закрытия попапа
function closePopup() {
  var addedCard = map.querySelector('.map__card');
  addedCard.remove();
}

// ----- Перемещение главной метки
mainPin.addEventListener('click', function () {
  enablePageState();
  fillAddressField();
  // ----- Отрисовываю пины
  drawPins(objectList);
});

// ----- Мапа для мин цены в зависимости от типа
var typePriceMap = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};
var type = notice.querySelector('#type');
var price = notice.querySelector('#price');

// ----- Изменение мин стоимости от типа объекта
type.addEventListener('change', function (event) {
  price.placeholder = typePriceMap[event.target.value];
  price.min = typePriceMap[event.target.value];
});

// ----- Валидация времени заезда/выезда
var timeIn = notice.querySelector('#timein');
var timeOut = notice.querySelector('#timeout');

timeIn.addEventListener('change', function (event) {
  timeOut.value = event.target.value;
});

timeOut.addEventListener('change', function (event) {
  timeIn.value = event.target.value;
});

// ----- Валидация кнопки отправки формы
// <template id="success"></template>

var submitBtn = notice.querySelector('.ad-form__submit');
submitBtn.addEventListener('click', function (event) {
  // event.preventDefault();
  console.log('Yo!');
  main.appendChild(successMessage);
});

var successMessage = document.querySelector('#success').content.querySelector('.success');

form.addEventListener('submit', function () {
  main.appendChild(successMessage);
  console.log('Hoi!');
});
