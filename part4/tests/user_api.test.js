require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const superstest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const initialUsers = [
  {
    name: 'Boris Frolikov',
    username: 'b_frolikov',
    passwordHash: '$2b$10$uqqYlGTl4tNo6xQ2wX0rDO4Kd3TY4LW4jkKKT.rOUq/CLOjDNhulW'
  },
  {
    name: 'Elon Musk',
    username: 'E.musk',
    passwordHash: '$2b$10$cW.LrwQBKKuZOsFDMNF7eu8zDVmBrOQuHBdnonQrDKlGFyyoDJO4C'
  }
];

const api = superstest(app);

describe('User API tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const userObjects = initialUsers.map(u => new User(u));
    const promiseArray = userObjects.map(uo => uo.save());
    await Promise.all(promiseArray);
  }, 15000);
  test('should return the list of users', async () => {
    const response = await api.get('/api/users');
    const firstUser = response.body[0];
    expect(firstUser.name).toBe(initialUsers[0].name);
    expect(firstUser.username).toBe(initialUsers[0].username);
    expect(firstUser.id).toBeDefined();
    expect(firstUser.passwordHash).not.toBeDefined();
  });
  test('should create a new user', async () => {
    const newUser = {
      name: 'Mike Stocklasa',
      username: 'rlm.mike',
      password: 'Ps6Bs'
    };
    const response = await api.post('/api/users').send(newUser);
    const savedUser = response.body;
    expect(savedUser.name).toBe(newUser.name);
    expect(savedUser.username).toBe(newUser.username);
    expect(savedUser.id).toBeDefined();
    expect(savedUser.passwordHash).not.toBeDefined();
    const userInDb = await User.findById(savedUser.id);
    expect(userInDb.passwordHash).toBeTruthy();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
