import { getRandomArrayElement, getRandomInteger } from './util.js';

const POST_ID_COUNT = 25;

const COMMENT_ID_COUNT = 100;

const LIKES_MIN = 15;

const LIKES_MAX = 200;

const COMMENTS_MAX = 5;

const FIRST_WORDS = [
  'Зелёный',
  'Кровожадный',
  'Потёртый',
  'Былинный',
  'Загадочный',
  'Сказочный',
  'Леденящий душу',
  'Вкусный',
  'Расслабляющий',
  'Секретный'
];

const SECOND_WORDS = [
  'горошек',
  'монстр',
  'рюкзак',
  'провал',
  'волшебник',
  'лес',
  'ужас',
  'ужин',
  'отдых',
  'договор'
];

const FIRST_NAMES = [
  'Гжегож',
  'Алла',
  'Альберт',
  'Джейсон',
  'Эдит'
];

const LAST_NAMES = [
  'Бржынчышчыкевич',
  'Пугачёва',
  'Эйнштейн',
  'Стейтем',
  'Пиаф'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'
];

const getRandomIdArray = (count) => {
  const newArray = [];
  let newId = getRandomInteger(1, count);

  while (newArray.length < count) {
    if (newArray.includes(newId)) {
      newId = getRandomInteger(1, count);
    } else {
      newArray.push(newId);
    }
  }

  return newArray;
};

const postIdArray = getRandomIdArray(POST_ID_COUNT);
const commentIdArray = getRandomIdArray(COMMENT_ID_COUNT);

const createComment = (count) => ({
  id: commentIdArray[count],
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
  name: `${getRandomArrayElement(FIRST_NAMES)} ${getRandomArrayElement(LAST_NAMES)}`
});

const getCommentsArray = (count) => {
  const newArray = [];

  for (let i = 0; i < count; i++) {
    newArray.push(createComment(1));
    commentIdArray.shift();
  }

  return newArray;
};

const createPost = (postCount) => ({
  id: postIdArray[postCount],
  url: `photos/${postIdArray[postCount]}.jpg`,
  description: `${getRandomArrayElement(FIRST_WORDS)} ${getRandomArrayElement(SECOND_WORDS)}`,
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: getCommentsArray(getRandomInteger(1, COMMENTS_MAX))
});

const createPostArray = () => {
  const newArray = [];

  for (let i = 0; i < POST_ID_COUNT; i++) {
    newArray.push(createPost(i));
  }

  return newArray;
};

export { createPostArray };
