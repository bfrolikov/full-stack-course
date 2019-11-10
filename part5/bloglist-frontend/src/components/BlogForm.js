import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const addNewBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.createNew({ title, author, url });
      setTitle('');
      setAuthor('');
      setUrl('');
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
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => { setTitle(target.value); }}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => { setAuthor(target.value); }}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => { setUrl(target.value); }}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
