import axios from 'axios';
const baseURL = '/api/login';

const login = async (loginInfo) => {
  const response = await axios.post(baseURL, loginInfo)
  return response.data
}


export default { login }