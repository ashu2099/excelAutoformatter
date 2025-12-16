export const sortAlphabetically = (input, sortKey, serialKey) => {
  input.sort((a, b) => (a[sortKey] > b[sortKey]) - (a[sortKey] < b[sortKey]));

  for (let i = 0; i < input.length; i++) {
    input[i][serialKey] = i + 1;
  }

  return input;
};

export const sortByDate = (input, sortKey, serialKey) => {
  input.sort(
    (objA, objB) =>
      new Date(objA[sortKey]).getTime() - new Date(objB[sortKey]).getTime()
  );

  for (let i = 0; i < input.length; i++) {
    input[i][serialKey] = i + 1;
  }

  return input;
};
