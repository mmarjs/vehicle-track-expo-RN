export function filterArray(entryArray) {
  const arrayLength = entryArray ? entryArray.length : 0;
  const resultArray = [];

  let index = 0;
  while (index < arrayLength) {
    let value = entryArray[index];

    if (typeof value === 'string') {
      value = value.trim();
    }

    if (value) {
      resultArray.push(value);
    }

    index += 1;
  }

  return resultArray;
}
