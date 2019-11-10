import axios from 'axios';

const baseUrl = '/api/blogs';

let token = '';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const createNew = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};
const setToken = (tk) => {
  token = `bearer ${tk}`;
};
export default { getAll, setToken, createNew };
