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

  for (let i = 0; i < string.length; i ++) {
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
