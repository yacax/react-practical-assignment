export const BASE_URL = 'https://initechtest-f220e52cb609.herokuapp.com' || 'http://localhost:8080';

export const TEST_POSTS = [
  {
    id: 1,
    title: 'Заголовок поста 1',
    username: 'user123',
    likes: ['user234', 'user345'],
    dislikes: ['user456'],
    imageSrc: 'https://source.unsplash.com/random',
    date: 1672527600000,
    comments: [
      {
        id: 1,
        username: 'user234',
        text: 'Отличный пост!',
        date: 1672527600000,
        postId: 1,
      },
      {
        id: 2,
        username: 'user345',
        text: 'Согласен с предыдущим комментарием.',
        date: 1672614000000,
        postId: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'Заголовок поста 2',
    username: 'user456',
    likes: ['user123', 'user345'],
    dislikes: ['user234'],
    imageSrc: 'https://source.unsplash.com/random',
    date: 1672614000000,
    comments: [
      {
        id: 1,
        username: 'user123',
        text: 'Интересная мысль.',
        date: 1672700400000,
        postId: 2,
      },
    ],
  },

];
