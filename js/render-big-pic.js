import { isEscapeKey } from './util.js';
import { posts } from './create-miniatures.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const social = bigPicture.querySelector('.social');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const allComments = bigPicture.querySelector('.social__comments');
const descriptionPhoto = bigPicture.querySelector('.social__caption');
const socialCommentCount = social.querySelector('.social__comment-count');
const commentsLoader = social.querySelector('.comments-loader');

const START_COMMENTS_COUNT = 5;
let commentsShown = 0, commentsLeft = 0;
let commentsArray = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
};

const onMouseClose = (evt) => {
  evt.preventDefault();
  closeBigPic();
};

const renderComments = (count) => {
  socialCommentCount.textContent = `${commentsShown} из ${commentsArray.length}`;
  for (let i = 0; i < count; i++) {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    li.innerHTML = `<img
                        class="social__picture"
                        src="${commentsArray[i].avatar}"
                        alt="${commentsArray[i].name}"
                        width="35" height="35">
              <p class="social__text">${commentsArray[i].message}</p>`;
    allComments.appendChild(li);
  }
};

const renderAllComments = () => {
  allComments.innerHTML = '';

  if (commentsArray.length > START_COMMENTS_COUNT) {
    if (commentsLeft > START_COMMENTS_COUNT) {
      commentsShown += START_COMMENTS_COUNT;
      commentsLeft -= START_COMMENTS_COUNT;

      renderComments(commentsShown);
    } else {
      commentsShown += commentsLeft;

      renderComments(commentsShown);
      commentsLoader.classList.add('hidden');
    }
    if (commentsLeft <= 0) {
      commentsLoader.classList.add('hidden');
    }
  } else {
    commentsShown = commentsArray.length;

    renderComments(commentsArray.length);
    commentsLoader.classList.add('hidden');
  }
};

const renderBigPic = ({url, likes, comments, description}) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  descriptionPhoto.textContent = description;
  commentsLeft = comments.length;
  renderAllComments();
};

function openBigPic(url) {
  renderBigPic(url);
  resetScale();
  resetEffects();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.querySelector('.cancel').addEventListener('click', onMouseClose);
  commentsLoader.addEventListener('click', renderAllComments);
}

function closeBigPic() {
  commentsShown = 0;
  commentsLeft = 0;

  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPicture.querySelector('.cancel').removeEventListener('click', onMouseClose);
  commentsLoader.removeEventListener('click', renderAllComments);
}

pictures.addEventListener('click', (evt) => {
  if(evt.target.closest('.picture')) {
    const url = String(evt.target.src).slice(String(evt.target.src).indexOf('photos'));
    const thisPost = posts.filter((post) => post.url === url)[0];
    commentsArray = thisPost.comments;
    openBigPic(thisPost);
  }
});
