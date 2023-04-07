import { isEscapeKey } from './util.js';
import { postsList } from './create-miniatures.js';

const START_COMMENTS_COUNT = 5;

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

let commentsShown = 0, commentsLeft = 0;
let commentsArray = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onMouseClose = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const renderComments = (count) => {
  socialCommentCount.textContent = `${commentsShown} из ${commentsArray.length}`;
  for (let i = 0; i < count; i++) {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = `${commentsArray[i].avatar}`;
    img.alt = `${commentsArray[i].name}`;
    img.width = '35';
    img.height = '35';

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = `${commentsArray[i].message}`;

    li.appendChild(img);
    li.appendChild(p);

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

function openBigPicture(url) {
  renderBigPic(url);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.querySelector('.cancel').addEventListener('click', onMouseClose);
  commentsLoader.addEventListener('click', renderAllComments);
}

function closeBigPicture() {
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
    const thisPost = postsList.filter((post) => post.url === url)[0];
    commentsArray = thisPost.comments;
    openBigPicture(thisPost);
  }
});
