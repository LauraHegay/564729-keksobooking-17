'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var STATUS_SUCCESS = 200;
  var TIME = 10000;

  var request = function (url, onSuccess, onError, method, data) {
    if (!method) {
      method = 'GET';
    }

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME; // 10s

    xhr.open(method, url);

    if (!data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  };

  window.load = function (onSuccess, onError) {
    return request(URL_LOAD, onSuccess, onError);
  };
  window.upload = function (onSuccess, onError) {
    var method = 'POST';
    return request(URL_UPLOAD, onSuccess, onError, method);
  };
})();
