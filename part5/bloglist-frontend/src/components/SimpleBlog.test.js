import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('Simple Blog tests', () => {
  let component;
  let mockLikeHandler;
  beforeEach(() => {
    mockLikeHandler = jest.fn();
    const testBlog = {
      title: 'Blog dedicated to testing',
      author: 'Boris Frolikov',
      likes: 2,
    };
    component = render(<SimpleBlog blog={testBlog} onClick={mockLikeHandler} />);
  });
  test('should render title, author and amount of likes', () => {
    expect(component.container).toHaveTextContent('Blog dedicated to testing');
    expect(component.container).toHaveTextContent('Boris Frolikov');
    expect(component.container).toHaveTextContent('blog has 2 likes');
  });
  test('like button pressed twice === event handler called twice', () => {
    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockLikeHandler.mock.calls.length).toBe(2);
  });
});
