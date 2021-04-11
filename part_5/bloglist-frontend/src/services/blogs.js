import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (newObject) => {
  console.log("token",token);
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default { getAll, createBlog, setToken };
