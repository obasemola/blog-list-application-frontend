import axios from 'axios'
const baseUrl = '/api/blogs'

let token
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async (newPost) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newPost, config)
  return response.data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  return await axios.delete(`${baseUrl}/${id}`, config)

}

export default { getAll, create, setToken, update, remove }