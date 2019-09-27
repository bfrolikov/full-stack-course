const dummy = blogs => 1;
const totalLikes = (blogs) => {
  if (!Array.isArray(blogs))
    return 0;

  const likesCounter = (accumulator, currentPost) => (
    accumulator + currentPost.likes
  );
  return blogs.reduce(likesCounter, 0);
};
const favouriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || !blogs.length)
    return null;

  let maxBlog = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > maxBlog.likes)
      maxBlog = blog;
  });
  return {
    title: maxBlog.title,
    author: maxBlog.author,
    likes: maxBlog.likes
  };
};
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
};
