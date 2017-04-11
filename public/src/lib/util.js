import axios from 'axios';

const routes = {
  'scheduled': '/api/user/scheduled',
  'now': 'api/user/now'
}

const retrievePosts = (type, email) => {
  return axios.get(routes[type], 
            { params: { email: email,
                        post_type: type } });
}

const submitNewPost = (type, newPost) => {
  return axios.post(routes[type], newPost);
}


const deletePost = (postId) => {
  return axios.delete(routes['scheduled'], 
          {params: {_id: postId }});
}

const getCurrentUserEmail = () => {
	console.log('get cur user id front end');
  return axios.get('/user');
}

export { retrievePosts, submitNewPost, getCurrentUserEmail, deletePost };

