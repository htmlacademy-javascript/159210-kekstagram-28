import { isEscapeKey, checkStringLength, checkSameSubstring } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileField = document.getElementById('upload-file');
const imgEditForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');
const descriptionField = imgUploadForm.querySelector('.text__description');
const imgUploadBtn = imgUploadForm.querySelector('.img-upload__submit');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');

const modalCases = ['error', 'success'];

const closeModal = (result) => {
  document.querySelector(`.${result}`).remove();

  document.removeEventListener('keydown', onDocumentKeydown);
};

const showModal = (result) => {
  const modalTemplate = document.querySelector(`#${result}`)
    .content.querySelector(`.${result}`);
  const modalElement = modalTemplate.cloneNode(true);

  document.body.appendChild(modalElement);

  document.querySelector(`.${result}`).addEventListener('click', (evt) => {
    if (!evt.target.classList.contains(`${result}__inner`)) {
      closeModal(result);
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);
};

const onSuccess = () => {
  closeUploadForm();
  showModal('success');
};
const onError = () => showModal('error');

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

const blockSubmitBtn = () => {
  imgUploadBtn.disabled = true;
};

const unblockSubmitBtn = () => {
  imgUploadBtn.disabled = false;
};

const setUploadFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitBtn();
      sendData(new FormData(evt.target), onSuccess, onError)
        .finally(unblockSubmitBtn);
    }
  });
};

setUploadFormSubmit(closeUploadForm);

const isTextFieldsFocused = () => document.activeElement === hashtagsField ||
  document.activeElement === descriptionField;

const isModalOpen = (modalName) => {
  const modal = document.querySelector(`.${modalName}`);

  if (modal) {
    return true;
  }
  return false;
};


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldsFocused() && !isModalOpen('error')) {
    evt.preventDefault();
    closeUploadForm();
  }

  modalCases.forEach((modalCase) => {
    if (isModalOpen(modalCase)) {
      closeModal(modalCase);
    }
  });
}

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
  const file = uploadFileField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }

  openUploadForm();
});
