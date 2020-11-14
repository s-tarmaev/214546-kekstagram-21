"use strict";

(() => {
  const getRandomInteger = (min, max) => {
    const random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  };

  const getRandomArrayElement = (array) => {
    const number = getRandomInteger(0, array.length - 1);
    return array[number];
  };

  const makeElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  const isEscEvent = (evt, action) => {
    if (evt.key === `Escape`) {
      action();
    }
  };
  const isEnterEvent = (evt, action) => {
    if (evt.key === `Enter`) {
      action();
    }
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    getRandomArrayElement: getRandomArrayElement,
    makeElement: makeElement,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
  };
})();
