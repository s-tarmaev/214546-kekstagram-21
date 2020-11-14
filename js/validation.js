"use strict";

(() => {
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_COMMENT_LENGTH = 140;
  const NUMBER_OF_HASHTAG = 5;

  const inputHashtags = document.querySelector(`.text__hashtags`);
  const inputComment = document.querySelector(`.text__description`);

  // Хештеги

  const validateHashtags = () => {
    const inputValue = inputHashtags.value;
    inputHashtags.setCustomValidity(``);
    const hashTags = inputValue.toLowerCase().split(` `);
    const regex = /^#[a-zа-яё0-9]+$/;

    for (let i = 0; i < hashTags.length; i++) {
      if (hashTags[i][0] !== `#`) {
        inputHashtags.setCustomValidity(
            `Хештег должен начинаться с # и не иметь пробелов`
        );
        return;
      }
      if (hashTags.length > NUMBER_OF_HASHTAG) {
        inputHashtags.setCustomValidity(`Нельзя указать больше 5 хештегов`);
        return;
      }
      if (hashTags[i].length < MIN_HASHTAG_LENGTH) {
        inputHashtags.setCustomValidity(
            `Добавьте ещё ` + (MIN_HASHTAG_LENGTH - hashTags[i].length) + ` симв.`
        );
        return;
      }
      if (hashTags[i].length > MAX_HASHTAG_LENGTH) {
        inputHashtags.setCustomValidity(
            `Удалите лишние ` +
            (hashTags[i].length - MAX_HASHTAG_LENGTH) +
            ` симв.`
        );
        return;
      }
      if (!regex.test(hashTags[i])) {
        inputHashtags.setCustomValidity(
            `Хештег не должен содержать пробелы, спецсимволы (#, @, $ и т.д.) и символы пунктуации`
        );
        return;
      }
      for (let k = i + 1; k < hashTags.length; k++) {
        if (hashTags[i] === hashTags[k]) {
          inputHashtags.setCustomValidity(
              `Есть одинаковые хeштеги! Проверьте хeштеги ` +
              (i + 1) +
              ` и ` +
              (k + 1)
          );
          return;
        }
      }
    }
    inputHashtags.setCustomValidity(``);
  };

  // Мы валидируем значение инпута при вводе в него символов
  inputHashtags.addEventListener(`change`, validateHashtags);

  inputComment.addEventListener(`input`, () => {
    const commentLength = inputComment.value.length;

    if (commentLength > MAX_COMMENT_LENGTH) {
      inputComment.setCustomValidity(
          `Удалите лишние ` + (commentLength - MAX_COMMENT_LENGTH) + ` симв.`
      );
    } else {
      inputComment.setCustomValidity(``);
    }
  });

  window.validation = {
    inputHashtags: inputHashtags,
    inputComment: inputComment,
  };
})();
