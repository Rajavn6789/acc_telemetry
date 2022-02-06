
 export const getRandomValue = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomTwoValues = (value1, value2) => {
    return Math.random() < 0.5 ? value1 : value2;
}