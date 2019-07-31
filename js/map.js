'use strict';
// модуль, который управляет карточками объявлений и пинами:
// добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var similarAnnoucementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // функция создания DOM-элемента на основе JS-объекта,
  var createSimilarAnnoucements = function (template) {
    return template.cloneNode(true);
  };
  window.map = {
    // функция заполнения блока DOM-элементами на основе массива JS-объектов.
    fillSimilarAnnoucements: function (data) {
      var similarListElement = document.querySelector('.map__pins');
      var annoucementAllElement = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        var annoucementElement = createSimilarAnnoucements(similarAnnoucementTemplate);
        annoucementElement.querySelector('img').src = data[i].author.avatar;
        annoucementElement.style.top = data[i].location.y - PIN_HEIGHT + 'px';
        annoucementElement.style.left = data[i].location.x - PIN_WIDTH / 2 + 'px';
        annoucementAllElement.appendChild(annoucementElement);
      }
      similarListElement.appendChild(annoucementAllElement);
    }
  };
})();
