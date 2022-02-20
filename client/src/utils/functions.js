export const getRandomValue = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomTwoValues = (value1, value2) => {
  return Math.random() < 0.5 ? value1 : value2;
};

export const generateRangeArr = (start, end, interval) => {
  const ticks = (end - start) / interval;
  let rangerArr = Array(Math.round(ticks) + 1).fill(0);
  rangerArr = rangerArr.map((val, index) => {
    return start + index * interval;
  });
  return rangerArr;
};


