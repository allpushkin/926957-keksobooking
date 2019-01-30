'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // ----- Добавление аватарки
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avararPreview = document.querySelector('.ad-form-header__preview').children[0];

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avararPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
  // ----- Добавление картинки объявления
  var adImageChooser = document.querySelector('.ad-form__input');
  var adImagePreview = document.querySelector('.ad-form__photo').children[0];

  adImageChooser.addEventListener('change', function () {
    var file = adImageChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        adImagePreview.classList.remove('visually-hidden');
        adImagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
