import axios from 'axios';

const routes = {
  'scheduled': '/api/user/scheduled'
}

const retrievePosts = (type, email) => {
  return axios.get(routes[type], 
            { params: { email: email } });
}

const submitNewPost = (type, newPost) => {
  console.log('what do we have in the new post? -----', newPost)
  return axios.post(routes[type], newPost);
}

export { retrievePosts, submitNewPost };