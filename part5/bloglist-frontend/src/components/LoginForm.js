import React from 'react';


const LoginForm = ({ data }) => (
  <form onSubmit={data.handleLogin} className="loginForm">
    <div>
      Username:
      <input {...data.username} reset="" />
    </div>
    <div>
      Password:
      <input {...data.password} reset="" />
    </div>
    <button type="submit">login</button>
  </form>
);
export default LoginForm;
