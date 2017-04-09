import axios from 'axios';

const routes = {
  'scheduled': '/api/user/scheduled'
}

const retrievePosts = (type, email) => {
  return axios.get(routes[type], 
            { params: { email: email } });
}

const submitNewPost = (type, newPost) => {
  return axios.post(routes[type], newPost);
}

export { retrievePosts, submitNewPost };