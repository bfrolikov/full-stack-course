import React from 'react';
import { render, waitForElement, wait } from '@testing-library/react';
import App from './App';

jest.mock('./services/blogs');

describe('<App/>', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() => component.container.querySelector('.loginForm'));
    expect(component.container.querySelector('.loginForm')).not.toBeNull();
    expect(component.container.querySelector('.blog')).toBeNull();
  });
  test('if the user is logged in, blogs are displayed', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester',
    };
    localStorage.setItem('loggedAppUser', JSON.stringify(user));
    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() => component.container.querySelector('.blog'));
    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(3);
    expect(component.container).toHaveTextContent('React patterasdns');
  });
});
