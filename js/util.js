const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function checkStringLength(string, maxLength) {
  return (string.length <= maxLength);
}

checkStringLength('проверяемая строка', 20);

function checkStringPalindrom(string) {
  const halfLength = string.length % 2 ? (string.length - 1) / 2 : string.length / 2;
  let isPalindrom;
  const stringNoSpace = string.split(' ').join('');

  for (let i = 0; i < halfLength; i++) {
    isPalindrom = stringNoSpace.slice(0, 1).toLowerCase() === stringNoSpace.slice(-0 - 1).toLowerCase();
    if (isPalindrom === false) {
      break;
    }
  }
  return isPalindrom;
}

checkStringPalindrom('топот');

function extractNumbers(string) {
  const pattern = /\d+/g;
  let onlyNumbers = '';

  for (let i = 0; i < string.length; i++) {
    if (string[i].match(pattern)) {
      onlyNumbers += string[i];
    }
  }

  return onlyNumbers === '' ? NaN : Number(onlyNumbers);
}

extractNumbers('2023 год');

function addToString(startString, endStringLength, addSymbol) {
  if (startString.length < endStringLength) {
    const difLength = endStringLength - startString.length;
    const addStringLength = addSymbol.length;
    let endString;

    if (addStringLength <= difLength) {
      endString = addSymbol + startString;
      if (endString.length < endStringLength) {
        addToString(endString, endStringLength, addSymbol);
      } else {
        return endString;
      }
    } else {
      const newAddString = addSymbol.slice(0, difLength);
      endString = newAddString + startString;
      return endString;
    }
  } else {
    return startString;
  }
}

addToString('1', 2, '0');

const isEscapeKey = (evt) => evt.key === 'Escape';

function checkSameSubstring (value) {
  const array = value.toLowerCase().split(/(\s+)/).filter((e) => e.trim().length > 0);
  return array.some((e, i, arr) => arr.indexOf(e) !== i);
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle(callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

const getRandomNumsArray = (count, maxNum = count) => {
  const newList = [];
  let newId = getRandomInteger(1, maxNum);

  while (newList.length < count) {
    if (newList.includes(newId)) {
      newId = getRandomInteger(1, maxNum);
    } else {
      newList.push(newId);
    }
  }

  return newList;
};

export { getRandomInteger, getRandomArrayElement, isEscapeKey,
  checkStringLength, checkSameSubstring, showAlert, debounce, throttle,
  getRandomNumsArray };
