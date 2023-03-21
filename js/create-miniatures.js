import { createPostArray } from './create-data.js';

const picsContainer = document.querySelector('.pictures');
const picTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const posts = createPostArray();

posts.forEach((post) => {
  const picElement = picTemplate.cloneNode(true);
  picElement.querySelector('.picture__img').src = post.url;
  picElement.querySelector('.picture__likes').textContent = post.likes;
  picElement.querySelector('.picture__comments').textContent = post.comments.length;
  picsContainer.appendChild(picElement);
});

