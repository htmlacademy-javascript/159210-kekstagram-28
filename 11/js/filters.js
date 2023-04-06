import { originalData } from './api.js';
import { getRandomNumsArray } from './create-data.js';
import { renderPosts } from './create-miniatures.js';
import { debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const filtersBtns = imgFilters.querySelectorAll('.img-filters__button');

const RERENDER_DELAY = 500;
const COUNT_RENDER_RANDOM = 10;

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

//нужно делать ререндер картинок при клике на фильтр

// По умолчанию — фотографии в изначальном порядке с сервера.
// Случайные — 10 случайных, не повторяющихся фотографий.
// Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.

const compareCommentsTotal = (postA, postB) => postB.comments.length - postA.comments.length;

const Filters = {
  DEFAULT: () => originalData,
  RANDOM: (array) => {
    const randomIds = getRandomNumsArray(COUNT_RENDER_RANDOM, array.length - 1);
    const newArray = [];

    randomIds.forEach((id) => {
      const newEntry = array.find((entry) => entry.id === id);
      newArray.push(newEntry);
    });
    return newArray;
  },
  DISCUSSED: (array) => array.slice().sort(compareCommentsTotal)
};

let currentFilter = Filters.DEFAULT;

const swithCurrentFilter = (current) => {
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
    swithCurrentFilter(currentBtn);
    debounce(
      () => renderPosts(currentFilter(originalData)),
      RERENDER_DELAY,
    )();
  }
});

export { showFilters };
