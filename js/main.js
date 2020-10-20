"use strict";

const PHOTOS = 25;

const DESCRIPTIONS = [
  `Если вы могли отправиться в любую точку мира, куда держали бы путь?`,
  `Угадайте, где я?`,
  `Можно вычеркнуть эту страну из списка`,
  `Калории, набранные в отпуске, не считаются`,
  `Да, еще одно фото`,
  `Приветики`,
];

const NAMES = [
  `Ярополк`,
  `Гостомысл`,
  `Велимудр`,
  `Всеволод`,
  `Богдан`,
  `Доброгнева`,
];

const LIKES = {
  MIN: 15,
  MAX: 200,
};

const COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];

const NUMBER_OF_COMMENTS = {
  MIN: 1,
  MAX: 5,
};

const FRIENDS = 6;

const getRandomInteger = (min, max) => {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

const getRandomArrayElement = (array) => {
  const number = getRandomInteger(0, array.length - 1);
  return array[number];
};

const createUrl = (number) => {
  return `photos/` + number + `.jpg`;
};

const createAvatar = (number) => {
  return `img/avatar-` + number + `.svg`;
};

const createComment = () => {
  const avatar = createAvatar(getRandomInteger(1, FRIENDS));
  const message = getRandomArrayElement(COMMENTS);
  const name = getRandomArrayElement(NAMES);
  return {avatar, message, name};
};

const createPhoto = (i) => {
  const url = createUrl(i);
  const description = getRandomArrayElement(DESCRIPTIONS);
  const likes = getRandomInteger(LIKES.MIN, LIKES.MAX);
  const comments = [];
  const commentsCount = getRandomInteger(
      NUMBER_OF_COMMENTS.MIN,
      NUMBER_OF_COMMENTS.MAX
  );
  for (let j = 0; j <= commentsCount; j++) {
    comments.push(createComment());
  }
  return {url, description, likes, comments};
};

const photos = [];
for (let i = 1; i <= PHOTOS; i++) {
  photos.push(createPhoto(i));
}

const pictures = document.querySelector(`.pictures`);

const cardTemplate = document
  .querySelector(`#picture`)
  .content.querySelector(`.picture`);

const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(`.picture__img`).src = card.url;

  for (let i = 0; i < card.comments.length; i++) {
    cardElement.querySelector(`.picture__comments`).textContent =
      card.comments[i].message;
  }
  cardElement.querySelector(`.picture__likes`).textContent = card.likes;
  return cardElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < photos.length; i++) {
  fragment.appendChild(createCard(photos[i]));
}
pictures.appendChild(fragment);
