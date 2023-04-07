import { getData } from './api.js';
import { showFilters } from './filters.js';
import { showAlert } from './util.js';

const picsContainer = document.querySelector('.pictures');
const picTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

let postsList;

const renderPosts = (posts) => {
  postsList = posts;
  picsContainer.querySelectorAll('.picture').forEach((pic) => pic.remove());
  const postFragment = document.createDocumentFragment();

  posts.forEach(({ url, likes, comments }) => {
    const picElement = picTemplate.cloneNode(true);
    picElement.querySelector('.picture__img').src = url;
    picElement.querySelector('.picture__likes').textContent = likes;
    picElement.querySelector('.picture__comments').textContent = comments.length;
    postFragment.appendChild(picElement);
  });

  picsContainer.appendChild(postFragment);
};

getData(renderPosts, showFilters, showAlert);

export { postsList, renderPosts };
