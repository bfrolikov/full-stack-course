const fakeBlogs = [
  {
    id: '5d891d3640826180c002e676',
    title: 'React patterns',
    author: 'Michael Chan',
    user: {
      _id: '5d8d2b93c4035677cc175190',
      username: 'b_frolikov',
      name: 'Boris Frolikov',
    },
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5d8d2baac4035677cc175191',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    user: {
      _id: '5d8d2b93c4035677cc175190',
      username: 'E.musk',
      name: 'Elon Musk',
    },
    url: 'https://123.com/',
    likes: 7,
  }, {
    id: '5d891d7740826180c002e678',
    title: 'React patterasdns',
    author: 'Michasdaael Chan',
    user: {
      _id: '5d8d2b93c4035677cc175190',
      username: 'b_frolikov',
      name: 'Boris Frolikov',
    },
    url: 'https://reasdactpatterns.com/',
    likes: 7,
  },
];

const getAll = () => (
  Promise.resolve(fakeBlogs)
);
const setToken = (token) => { };

export default { getAll, setToken };
