const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};

const getDataErrorMessage = 'Не удалось загрузить данные. Попробуйте обновить страницу';

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body});

const getData = (renderData, onError) =>
  load(Route.GET_DATA)
    .then((response) => response.json())
    .then((data) => {
      renderData(data);
    })
    .catch(() => {
      onError(getDataErrorMessage);
    });

const sendData = (body, onSuccess, onError) =>
  load(Route.SEND_DATA, Method.POST, body)
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });

export { getData, sendData };
