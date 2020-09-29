import axios from 'axios';
const baseURL = '/api/login';

const login = async (loginInfo) => {
  return await axios.post(baseURL, loginInfo)
}


export default login;