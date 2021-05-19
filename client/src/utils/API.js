import axios from 'axios';

export default {
    getPosts: function() {
        return axios.get('/api/post');
    },
    getPost: function(id) {
        return axios.get(`/api/post/${id}`)
    },
    deletePost: function(id) {
        return axios.delete(`/api/post/${id}`)
    }
};
