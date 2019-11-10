import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';
import Togglable from './components/Togglable';
import { useField } from './hooks/index';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const username = useField('text');
  const password = useField('text');
  useEffect(() => {
    blogService
      .getAll()
      .then((data) => { setBlogs(data); });
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON);
      setUser(savedUser);
      blogService.setToken(savedUser.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const receivedUser = await loginService.login({
        username: username.value,
        password: password.value,
      });
      username.reset();
      password.reset();
      window.localStorage.setItem('loggedAppUser', JSON.stringify(receivedUser));
      blogService.setToken(receivedUser.token);
      setUser(receivedUser);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser');
    blogService.setToken('');
    setUser(null);
  };
  const loginFormData = {
    handleLogin,
    username,
    password,
  };
  if (user === null) {
    return (
      <div>
        <h1>Log in to the application</h1>
        <LoginForm data={loginFormData} />
      </div>
    );
  }
  return (
    <div>
      <h1>Blogs</h1>
      <div>
        {user.username} logged in
        <button onClick={handleLogout} type="button">log out</button>
      </div>
      <h1>Create new</h1>
      <Togglable buttonLabel="new blog">
        <BlogForm blogs={blogs} setBlogs={setBlogs} />
      </Togglable>
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
