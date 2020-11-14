"use strict";

(() => {
  const SCALE_VALUE = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
  };

  const effectNames = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

  const scaleSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleBigger = document.querySelector(`.scale__control--bigger`);
  const scaleInput = document.querySelector(`.scale__control--value`);
  const effectLevel = document.querySelector(`.effect-level`);
  const effectPin = effectLevel.querySelector(`.effect-level__pin`);
  const effectValue = effectLevel.querySelector(`.effect-level__value`);
  const effectDepth = effectLevel.querySelector(`.effect-level__depth`);
  const effectLine = effectLevel.querySelector(`.effect-level__line`);
  const effectItem = document.querySelectorAll(`.effects__radio`);
  const uploadForm = document.querySelector(`.img-upload__form`);
  const uploadFile = uploadForm.querySelector(`.img-upload__input`);
  const uploadOverlay = uploadForm.querySelector(`.img-upload__overlay`);
  const uploadCancel = uploadOverlay.querySelector(`#upload-cancel`);
  const imagePreview = document.querySelector(`.img-upload__preview`);
  // const inputHashtags = document.querySelector(`.text__hashtags`);
  // const inputComment = document.querySelector(`.text__description`);

  let effectsDirectoryFilter;
  let currentEffect;

  // открытие окна формы
  const handleOpenUploadForm = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      if (document.activeElement === window.validation.inputHashtags) {
        return;
      }
      if (document.activeElement === window.validation.inputComment) {
        return;
      }
      uploadOverlay.classList.add(`hidden`);
    }
  };

  const openUploadForm = () => {
    uploadOverlay.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    effectLevel.classList.add(`hidden`);
    document.addEventListener(`keydown`, handleOpenUploadForm);
  };

  uploadFile.addEventListener(`change`, () => {
    openUploadForm();
  });

  // закрытие окна
  const closeUploadForm = () => {
    uploadOverlay.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, handleOpenUploadForm);
  };

  uploadCancel.addEventListener(`click`, () => {
    closeUploadForm();
  });

  uploadForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
  });

  effectPin.onmousedown = (evt) => {
    evt.preventDefault();

    let shiftX = evt.clientX - effectPin.getBoundingClientRect().left;

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

    function onMouseMove(evtx) {
      let newLeft =
        evtx.clientX - shiftX - effectLevel.getBoundingClientRect().left;

      if (newLeft < 0) {
        newLeft = 0;
      }

      let rightEdge = effectLine.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      effectPin.style.left = newLeft + `px`;
      effectDepth.style.width = newLeft + `px`;
      effectValue.value = Math.round((newLeft / rightEdge) * 100);
      effectsDirectory[effectsDirectoryFilter](newLeft / rightEdge);
    }

    function onMouseUp() {
      document.removeEventListener(`mouseup`, onMouseUp);
      document.removeEventListener(`mousemove`, onMouseMove);
    }
  };

  effectPin.ondragstart = () => {
    return false;
  };

  const getOriginal = () => {
    effectLevel.classList.add(`hidden`);
  };

  const getGrayscale = (grayscale) => {
    imagePreview.style.filter = `grayscale(` + grayscale + `)`;
  };

  const getSepia = (sepia) => {
    imagePreview.style.filter = `sepia(` + sepia + `)`;
  };

  const getInvert = (invert) => {
    imagePreview.style.filter = `invert(` + invert * 100 + `%)`;
  };

  const getBlur = (blur) => {
    imagePreview.style.filter = `blur(` + blur * 3 + `px)`;
  };

  const getBrightness = (brightness) => {
    imagePreview.style.filter = `brightness(` + (brightness * 3 + 1) + `)`;
  };

  const effectsDirectory = {
    none: getOriginal,
    chrome: getGrayscale,
    sepia: getSepia,
    marvin: getInvert,
    phobos: getBlur,
    heat: getBrightness,
  };

  const addEffectHandler = (effects, effectName) => {
    effects.addEventListener(`click`, () => {
      effectLevel.classList.remove(`hidden`);
      imagePreview.classList.remove(currentEffect);
      imagePreview.removeAttribute(`style`);
      scaleImage();
      effectPin.style.left = 100 + `%`;
      effectDepth.style.width = 100 + `%`;
      currentEffect = `effects__preview--` + effectName;
      imagePreview.classList.add(currentEffect);

      effectsDirectoryFilter = effectName;
      if (effectName === `none`) {
        effectLevel.classList.add(`hidden`);
      }
    });
  };

  for (let i = 0; i < effectItem.length; i++) {
    addEffectHandler(effectItem[i], effectNames[i]);
  }

  const scaleImage = (directionScale) => {
    let currentScale = parseInt(scaleInput.value, 10);
    if (!directionScale) {
      imagePreview.style.transform = `scale(` + currentScale / 100 + `)`;
      return;
    }
    currentScale = currentScale + SCALE_VALUE.STEP * directionScale;
    if (currentScale >= SCALE_VALUE.MIN && currentScale <= SCALE_VALUE.MAX) {
      scaleInput.value = currentScale + `%`;
      imagePreview.style.transform = `scale(` + currentScale / 100 + `)`;
    }
  };

  scaleSmaller.addEventListener(`click`, () => {
    scaleImage(-1);
  });
  scaleBigger.addEventListener(`click`, () => {
    scaleImage(1);
  });
})();
