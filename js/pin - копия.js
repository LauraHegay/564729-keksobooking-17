'use strict';
// модуль, который отвечает за создание пина — метки на карте

(function () {
  var TOP_BORDER_AREA = 43;
  var BOTTOM_BORDER_AREA = 543;
  var LEFT_BORDER_AREA = -32;
  var RIGHT_BORDER_AREA = 1166;
  var pin = document.querySelector('.map__pin--main');

  var onPinButtonMouseup = function () {
    window.form.setAddres(false);
  };

  pin.addEventListener('mouseup', onPinButtonMouseup);

  // Перетаскивание пина по карте
  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.form.setActiveMode();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var getCoord = function (shift, offset, min, max) {
      var coord = (offset - shift);
      if (coord < min) {
        return min;
      }
      if (coord > max) {
        return max;
      }
      return coord;
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      pin.style.top = getCoord(shift.y, pin.offsetTop, TOP_BORDER_AREA, BOTTOM_BORDER_AREA) + 'px';
      pin.style.left = getCoord(shift.x, pin.offsetLeft, LEFT_BORDER_AREA, RIGHT_BORDER_AREA) + 'px';
      window.form.setAddres(false);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
