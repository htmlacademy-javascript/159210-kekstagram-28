import { isEscapeKey, checkStringLength, checkSameSubstring } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileField = document.getElementById('upload-file');
const imgEditForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const descriptionField = imgUploadForm.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'input__inner'
});

pristine.addValidator(hashtagsField, validateHashtags, 'Хэштег или список хэштегов не соответствует правилам');
pristine.addValidator(descriptionField, validateComment, 'Длина комментария не может быть больше 140 символов');

function validateHashtags(value) {
  if (!value) {
    return true;
  }

  const exp = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtagArray = value.split(/(\s+)/).filter((e) => e.trim().length > 0);
  const isValid = hashtagArray.every((hashtag) => exp.test(hashtag));
  const isLengthOk = hashtagArray.length <= 5;
  const isNoSameSubstring = !checkSameSubstring(value);

  return isValid && isLengthOk && isNoSameSubstring;
}

function validateComment(value) {
  return checkStringLength(value, 140);
}

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    closeUploadForm();
  }
});

const isTextFieldsFocused = () => document.activeElement === hashtagsField ||
  document.activeElement === descriptionField;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldsFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onMouseClose = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

function closeUploadForm() {
  imgUploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();

  imgEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadCancel.removeEventListener('click', onMouseClose);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function openUploadForm() {
  imgEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  imgUploadCancel.addEventListener('click', onMouseClose);
  document.addEventListener('keydown', onDocumentKeydown);
}

uploadFileField.addEventListener('change', () => {
  openUploadForm();
});
