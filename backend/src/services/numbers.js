export const generateNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

export const guessNumber = (guess, generatedNumber) => {
  console.log(`Generated number: ${generatedNumber}`);
  if (guess < generatedNumber) {
    return 'Загадане число меньше';
  } else if (guess > generatedNumber) {
    return 'Загадане число більше';
  } else {
    return 'Число вгадано';
  }
};
