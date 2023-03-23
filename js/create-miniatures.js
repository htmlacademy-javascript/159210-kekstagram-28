import { createPostArray } from './create-data.js';

const picsContainer = document.querySelector('.pictures');
const picTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const posts = createPostArray();

posts.forEach(({url, likes, comments}) => {
  const picElement = picTemplate.cloneNode(true);
  picElement.querySelector('.picture__img').src = url;
  picElement.querySelector('.picture__likes').textContent = likes;
  picElement.querySelector('.picture__comments').textContent = comments.length;
  picsContainer.appendChild(picElement);
});

export { posts };
