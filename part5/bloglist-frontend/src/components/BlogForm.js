/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import blogService from '../services/blogs';
import { useField } from '../hooks/index';

const BlogForm = ({ blogs, setBlogs }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');
  const addNewBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.createNew({ title: title.value, author: author.value, url: url.value });
      title.reset();
      author.reset();
      url.reset();
      setBlogs(blogs.concat(newBlog));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={addNewBlog}>
        <div>
          Title:
          <input {...title} reset="" />
        </div>
        <div>
          Author:
          <input {...author} reset="" />
        </div>
        <div>
          Url:
          <input {...url} reset="" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
