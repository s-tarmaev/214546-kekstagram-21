"use strict";

(() => {
  const photos = [];
  const PHOTOS = 25;
  const bigPicture = document.querySelector(`.big-picture`);
  const hideLoader = bigPicture.querySelector(`.comments-loader`);
  const hideCount = bigPicture.querySelector(`.social__comment-count`);
  const closeButton = bigPicture.querySelector(`.big-picture__cancel`);
  const pictures = document.querySelector(`.pictures`);

  const createCard = (card) => {
    const cardElement = window.data.cardTemplate.cloneNode(true);

    cardElement.querySelector(`.picture__img`).src = card.url;

    for (let i = 0; i < card.comments.length; i++) {
      cardElement.querySelector(`.picture__comments`).textContent =
        card.comments.message;
    }
    cardElement.querySelector(`.picture__likes`).textContent = card.likes;
    return cardElement;
  };

  const pasteElement = (comment) => {
    const listItem = window.util.makeElement(`li`, `social__comment`);

    const picture = window.util.makeElement(`img`, `social__picture`);
    picture.src = comment.avatar;
    picture.alt = comment.name;
    picture.width = 35;
    picture.height = 35;
    listItem.appendChild(picture);

    const text = window.util.makeElement(`p`, `social__text`, comment.message);
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
    document.querySelector(`.social__caption`).textContent =
      bigCard.description;
  };

  // 1. Генерация фотографий
  for (let i = 1; i <= PHOTOS; i++) {
    photos.push(window.data.createPhoto(i));
  }

  // 2. Вставка фотографий в документ
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(createCard(photos[i]));
  }
  pictures.appendChild(fragment);

  // 3. Открытие модального окна и удаления прокрутки фона при скролле
  const addPictureClickHandler = (pictureItem, dataCard) => {
    pictureItem.addEventListener(`click`, () => {
      createBigCard(dataCard);
      bigPicture.classList.remove(`hidden`);
      document.body.classList.add(`modal-open`);
    });
  };

  const smallPictures = document.querySelectorAll(`.picture`);
  for (let i = 0; i < smallPictures.length; i++) {
    addPictureClickHandler(smallPictures[i], photos[i]);
  }

  // 4. Закрытие модального окна
  const closeBigPicture = () => {
    document.removeEventListener(`keydown`, onBigPictureEscPress);
    bigPicture.classList.add(`hidden`);
  };

  const onBigPictureEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closeBigPicture();
    }
  };

  closeButton.addEventListener(`click`, () => {
    closeBigPicture();
  });

  // 5. Скрытие счётчика комментариев и загрузки новых комментариев
  hideCount.classList.add(`hidden`);
  hideLoader.classList.add(`hidden`);
})();
