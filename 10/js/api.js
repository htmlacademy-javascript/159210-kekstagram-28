const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
const METHOD = {
  GET: 'GET',
  POST: 'POST'
};

const GET_DATA_ERROR_MESSAGE = 'Не удалось загрузить данные. Попробуйте обновить страницу';

const load = (route, method = METHOD.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body});

const getData = (renderData, onError) =>
  load(ROUTE.GET_DATA)
    .then((response) => response.json())
    .then((data) => {
      renderData(data);
    })
    .catch(() => {
      onError(GET_DATA_ERROR_MESSAGE);
    });

const sendData = (body, onSuccess, onError) =>
  load(ROUTE.SEND_DATA, METHOD.POST, body)
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
