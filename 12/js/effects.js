const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const EFFECTS = [
  {
    name: 'none',
    visibility: 'none',
    filter: 'none',
    postfix: '',
    min: 0,
    max: 100,
    step: 1
  }, {
    name: 'chrome',
    visibility: 'block',
    filter: 'grayscale',
    postfix: '',
    min: 0,
    max: 1,
    step: 0.1
  }, {
    name: 'sepia',
    visibility: 'block',
    filter: 'sepia',
    postfix: '',
    min: 0,
    max: 1,
    step: 0.1
  }, {
    name: 'marvin',
    visibility: 'block',
    filter: 'invert',
    postfix: '%',
    min: 0,
    max: 100,
    step: 1
  }, {
    name: 'phobos',
    visibility: 'block',
    filter: 'blur',
    postfix: 'px',
    min: 0,
    max: 3,
    step: 0.1
  }, {
    name: 'heat',
    visibility: 'block',
    filter: 'brightness',
    postfix: '',
    min: 0,
    max: 3,
    step: 0.1
  }
];

const DEFAULT_EFFECT = EFFECTS[0];

imgUploadPreview.classList.add(`effects__preview--${DEFAULT_EFFECT.name}`);

noUiSlider.create(effectLevelSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});

const changeSliderVisibility = (effect = EFFECTS[0].name) => {
  const thisEffect = EFFECTS.find((element) => element.name === effect);
  effectLevel.style.display = thisEffect.visibility;
};

changeSliderVisibility();

const changeSliderRange = (effect) => {
  const thisEffect = EFFECTS.find((element) => element.name === effect);
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: thisEffect.min,
      max: thisEffect.max,
    },
    step: thisEffect.step,
  });
  effectLevelSlider.noUiSlider.set(thisEffect.max);

};

const changeEffectIntensity = (effect, value) => {
  const thisEffect = EFFECTS.find((element) => element.name === effect);
  imgUploadPreview.style.filter = (thisEffect.name !== 'none') ?
    `${thisEffect.filter}(${value}${thisEffect.postfix})` :
    `${thisEffect.filter}`;
};

const resetEffects = (effect = DEFAULT_EFFECT.name) => {
  imgUploadPreview.className = `effects__preview--${effect}`;
  changeSliderRange(effect);
  changeSliderVisibility(effect);
  const thisEffect = EFFECTS.find((element) => element.name === effect);
  changeEffectIntensity(effect, thisEffect.max);
};

effectList.addEventListener('click', (evt) => {
  if (evt.target.closest('[type="radio"]')) {
    const effect = evt.target.closest('[type="radio"]').value;
    resetEffects(effect);
  }
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  const thisEffect = imgUploadPreview.classList[0].split('--')[1];
  changeEffectIntensity(thisEffect, effectLevelValue.value);
});

export { resetEffects };
