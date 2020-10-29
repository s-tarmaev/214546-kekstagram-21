'use strict';

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

const PHOTOS = 25;
const FRIENDS = 6;
const photos = [];
const pictures = document.querySelector(`.pictures`);
const cardTemplate = document
  .querySelector(`#picture`)
  .content.querySelector(`.picture`);
const bigPicture = document.querySelector(`.big-picture`);
const hideLoader = document.querySelector(`.comments-loader`);
const hideCount = document.querySelector(`.social__comment-count`);

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

const makeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const pasteElement = (comment) => {
  const listItem = makeElement(`li`, `social__comment`);

  const picture = makeElement(`img`, `social__picture`);
  picture.src = comment.avatar;
  picture.alt = comment.name;
  picture.width = 35;
  picture.height = 35;
  listItem.appendChild(picture);

  const text = makeElement(`p`, `social__text`, comment.message);
  listItem.appendChild(text);
  return listItem;
};

const createBigCard = (bigCard) => {
  const bigPictureImg = document
    .querySelector(`.big-picture__img`)
    .querySelector(`img`);
  bigPictureImg.src = bigCard.url;

  const commentListItems = document.querySelector(`.social__comments`);
  for (let i = 0; i < bigCard.comments.length; i++) {
    commentListItems.appendChild(pasteElement(bigCard.comments[i]));
  }

  document.querySelector(`.likes-count`).textContent = bigCard.likes;
  document.querySelector(`.comments-count`).textContent =
    bigCard.comments.length;
  document.querySelector(`.social__caption`).textContent = bigCard.description;
};

// 1. Генерация фотографий
for (let i = 1; i <= PHOTOS; i++) {
  photos.push(createPhoto(i));
}

// 2. Вставка фотографий в документ
const fragment = document.createDocumentFragment();
for (let i = 0; i < photos.length; i++) {
  fragment.appendChild(createCard(photos[i]));
}
pictures.appendChild(fragment);

// 3. Открытие модального окна и удаления прокрутки фона при скролле
bigPicture.classList.remove(`hidden`);
document.body.classList.add(`modal-open`);

// 4. Заполнение модального окна данными с 1 фотографии
createBigCard(photos[0]);

// 5. Скрытие счётчика комментариев и загрузки новых комментариев
hideCount.classList.add(`hidden`);
hideLoader.classList.add(`hidden`);
