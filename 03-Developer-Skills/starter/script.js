'use strict';

const temperature = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps) {
  return (
    Math.max(...temps.filter(temps => typeof temps === 'number')) +
    Math.min(...temps.filter(temps => typeof temps === 'number'))
  );
};
console.log(calcTempAmplitude(temperature));

const calcTemp = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  let amplitude = max + min;
  console.log(amplitude);
};

calcTemp(temperature);
