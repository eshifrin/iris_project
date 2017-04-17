import axios from 'axios';

const routes = {
  'scheduled': '/api/user/scheduled',
  'now': 'api/user/now',
  'posted': '/api/user/posted'
}

//delete this func
const getPostByPostId = (postId) => {
  console.log('post id in util : ', postId)
  return axios.get('/api/post/resubmit', { params: { postId } });
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

const getCurrentUserInfo = () => {
  return axios.get('/userinfo');
}

export { getPostByPostId, retrievePosts, submitNewPost, deletePost, getCurrentUserInfo };
