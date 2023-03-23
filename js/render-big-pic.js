import { isEscapeKey } from './util.js';
import { posts } from './create-miniatures.js';

const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const allComments = bigPicture.querySelector('.social__comments');
const descriptionPhoto = bigPicture.querySelector('.social__caption');

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

const renderComments = (comments) => {
  allComments.innerHTML = '';
  for (let i = 0; i < comments.length; i++) {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    li.innerHTML = `<img
                        class="social__picture"
                        src="${comments[i].avatar}"
                        alt="${comments[i].name}"
                        width="35" height="35">
              <p class="social__text">${comments[i].message}</p>`;
    allComments.appendChild(li);
  }
};

const renderBigPic = ({url, likes, comments, description}) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  descriptionPhoto.textContent = description;
  renderComments(comments);
};

function openBigPic(url) {
  renderBigPic(url);

  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.querySelector('.cancel').addEventListener('click', onMouseClose);
}

function closeBigPic() {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPicture.querySelector('.cancel').removeEventListener('click', onMouseClose);
}

pictures.forEach((picture) => {
  picture.addEventListener('click', (evt) => {
    const url = String(evt.target.src).slice(String(evt.target.src).indexOf('photos'));
    const thisPost = posts.filter((post) => post.url === url)[0];
    openBigPic(thisPost);
  });
});
