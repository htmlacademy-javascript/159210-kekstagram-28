import { isEscapeKey, checkStringLength, checkSameSubstring } from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileField = document.getElementById('upload-file');
const imgEditForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const descriptionField = imgUploadForm.querySelector('.text__description');
// const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');

const pristine = new Pristine(imgUploadForm);

pristine.addValidator(hashtagsField, validateHashtags);
pristine.addValidator(descriptionField, validateComment);

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