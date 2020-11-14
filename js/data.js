'use strict';

(() => {
  const NAMES = [
    `Ярополк`,
    `Гостомысл`,
    `Велимудр`,
    `Всеволод`,
    `Богдан`,
    `Доброгнева`,
  ];

  const COMMENTS = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
  ];

  const DESCRIPTIONS = [
    `Если вы могли отправиться в любую точку мира, куда держали бы путь?`,
    `Угадайте, где я?`,
    `Можно вычеркнуть эту страну из списка`,
    `Калории, набранные в отпуске, не считаются`,
    `Да, еще одно фото`,
    `Приветики`,
  ];

  const FRIENDS = {
    MIN: 1,
    MAX: 6,
  };

  const LIKES = {
    MIN: 15,
    MAX: 200,
  };

  const NUMBER_OF_COMMENTS = {
    MIN: 1,
    MAX: 5,
  };

  const cardTemplate = document
    .querySelector(`#picture`)
    .content.querySelector(`.picture`);

  const createUrl = (number) => {
    return `photos/` + number + `.jpg`;
  };

  const createAvatar = (number) => {
    return `img/avatar-` + number + `.svg`;
  };

  const createComment = () => {
    const avatar = createAvatar(
        window.util.getRandomInteger(FRIENDS.MIN, FRIENDS.MAX)
    );
    const message = window.util.getRandomArrayElement(COMMENTS);
    const name = window.util.getRandomArrayElement(NAMES);
    return {avatar, message, name};
  };

  const createPhoto = (i) => {
    const url = createUrl(i);
    const description = window.util.getRandomArrayElement(DESCRIPTIONS);
    const likes = window.util.getRandomInteger(LIKES.MIN, LIKES.MAX);
    const comments = [];
    const commentsCount = window.util.getRandomInteger(
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
        card.comments.message;
    }
    cardElement.querySelector(`.picture__likes`).textContent = card.likes;
    return cardElement;
  };

  window.data = {
    createPhoto: createPhoto,
    createCard: createCard
  };
})();
