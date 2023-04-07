import { originalData } from './api.js';
import { renderPosts } from './create-miniatures.js';
import { getRandomNumsArray, debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const filtersBtns = imgFilters.querySelectorAll('.img-filters__button');

const RERENDER_DELAY = 500;
const COUNT_RENDER_RANDOM = 10;

const Filters = {
  DEFAULT: () => originalData,
  RANDOM: (array) => {
    const randomIds = getRandomNumsArray(COUNT_RENDER_RANDOM, array.length - 1);
    const newList = [];

    randomIds.forEach((id) => {
      const newEntry = array.find((entry) => entry.id === id);
      newList.push(newEntry);
    });
    return newList;
  },
  DISCUSSED: (array) => array.slice().sort(compareCommentsTotal)
};

let currentFilter = Filters.DEFAULT;

const showFilters = () => imgFilters.classList.remove('img-filters--inactive');

function compareCommentsTotal (postA, postB) {
  return postB.comments.length - postA.comments.length;
}

const switсhCurrentFilter = (current) => {
  filtersBtns.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  current.classList.add('img-filters__button--active');
};

imgFilters.addEventListener('click', (evt) => {
  const currentBtn = evt.target.closest('[type="button"]');
  if (currentBtn) {
    const currentFilterName = evt.target.id.split('-')[1].toUpperCase();
    currentFilter = Filters[currentFilterName];
    switсhCurrentFilter(currentBtn);
    debounce(
      () => renderPosts(currentFilter(originalData)),
      RERENDER_DELAY,
    )();
  }
});

export { showFilters };
