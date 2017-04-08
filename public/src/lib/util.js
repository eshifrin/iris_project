import axios from 'axios';

const routes = {
  'scheduled': '/api/user/scheduled'
}

const retrievePosts = (type, email) => {
  return axios.get(routes[type], 
            { params: { email: email } });
}

export { retrievePosts };