// 'use strict';
// (function () {
//   // ----- Функция генерации случайного числа от и до
//   var getRandomValue = function (start, end) {
//     return Math.floor(Math.random() * end + start);
//   };
//   // ----- Функция для генерации массива объектов
//   var generateObjectList = function () {
//     var typesList = ['palace', 'flat', 'house', 'bungalo'];

//     var checkInOutTime = ['12:00', '13:00', '14:00'];

//     var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//     var photosList = [
//       'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//       'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//       'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
//     ];

//     var titlesList = [
//       'Большая уютная квартира',
//       'Маленькая неуютная квартира',
//       'Огромный прекрасный дворец',
//       'Маленький ужасный дворец',
//       'Красивый гостевой домик',
//       'Некрасивый негостеприимный домик',
//       'Уютное бунгало далеко от моря',
//       'Неуютное бунгало по колено в воде'
//     ];

//     var avatarNumbers = [];

//     for (var avatarCount = 1; avatarCount <= 8; avatarCount++) {
//       avatarNumbers.push(avatarCount);
//     }

//     // ----- Генерирую массив случайных объявлений
//     var objects = [];

//     for (var i = 0; i < 8; i++) {
//       var randomIndex = getRandomValue(0, avatarNumbers.length - 1);
//       var randomStringNumber = getRandomValue(0, titlesList.length);
//       var locationX = getRandomValue(1, window.utils.mapArea.scrollWidth);
//       var locationY = getRandomValue(130, 630);
//       var featuresListRandom = getRandomValue(0, featuresList.length - 1);

//       objects.push({
//         author: {
//           avatar: 'img/avatars/user0' + avatarNumbers[randomIndex] + '.png'
//         },
//         offer: {
//           title: titlesList.splice(randomStringNumber, 1)[0],
//           address: locationX + ', ' + locationY,
//           price: getRandomValue(1000, 1000000),
//           type: typesList[getRandomValue(0, typesList.length - 1)],
//           rooms: getRandomValue(1, 5),
//           guests: getRandomValue(1, 8),
//           checkin: checkInOutTime[getRandomValue(0, 2)],
//           checkout: checkInOutTime[getRandomValue(0, 2)],
//           features: featuresList.slice(0, featuresListRandom),
//           description: '',
//           photos: photosList
//         },
//         location: {
//           x: locationX,
//           y: locationY
//         }
//       });
//       avatarNumbers.splice(randomIndex, 1);
//     }
//     return objects;
//   };

//   // ----- Запускаю функцию генерации объектов
//   var objectList = generateObjectList();
//   window.objectList = objectList;
// })();
