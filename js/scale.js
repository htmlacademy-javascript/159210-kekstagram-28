const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const STEP = 25,
  MAX_SCALE = 100,
  MIN_SCALE = 25,
  DEFAULT_SCALE = 100;

scaleValue.value = MAX_SCALE;

const setNewScale = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const increaseScale = () => {
  const newValue = parseInt(scaleValue.value, 10) + STEP <= MAX_SCALE ? parseInt(scaleValue.value, 10) + STEP : MAX_SCALE;
  setNewScale(newValue);
};

const reduceScale = () => {
  const newValue = parseInt(scaleValue.value, 10) - STEP >= MIN_SCALE ? parseInt(scaleValue.value, 10) - STEP : MIN_SCALE;
  setNewScale(newValue);
};

const resetScale = () => setNewScale(DEFAULT_SCALE);

scaleSmaller.addEventListener('click', reduceScale);

scaleBigger.addEventListener('click', increaseScale);

export { resetScale };
