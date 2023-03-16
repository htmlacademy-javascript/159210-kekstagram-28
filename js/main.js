const POST_ID_COUNT = 25;

const COMMENT_ID_COUNT = 100;

const LIKES_MIN = 15;

const LIKEX_MAX = 200;

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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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
  message:  COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
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

const createPost = (count, commentsCount) => ({
  id: postIdArray[count],
  url: `photos/${postIdArray[count]}.jpg`,
  description: `${getRandomArrayElement(FIRST_WORDS)} ${getRandomArrayElement(SECOND_WORDS)}`,
  likes: getRandomInteger(LIKES_MIN, LIKEX_MAX),
  comments: getCommentsArray(getRandomInteger(1, commentsCount))
});

