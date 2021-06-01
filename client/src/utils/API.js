import axios from './axios';

export default {
    getPosts: async function() {
        try {
            const posts = await axios.get('/api/post');
            return posts;
        } catch (error) {
            console.log(error);
        };
    },
    getPost: async function(id) {
        try {
            const post = await axios.get(`/api/post/${id}`);
            return post;
        } catch (error) {
            console.log(error)
        };
    },
    getSomePosts: async function() {
        try {
            const posts = await axios.get('/api/post/some/some');
            return posts;
        } catch (error) {
            console.log(error);
        }
    },
    searchPosts: async function(search) {
        try{
            const posts = await axios.get(`/api/post/${search}`);
            return posts;
        } catch (error) {
            console.log(error);
        };
    },
    deletePost: async function(id) {
        try {
            await axios.delete(`/api/post/${id}`);
        } catch (error) {
            console.log(error)
        };
    },
    searchUser: async function(search) {
        try {
            const users = await axios.get(`/api/users/${search}`)
            return users;
        } catch (error) {
            console.log(error)
        };
    },
    getUsers: async function() {
        try {
            const users = await axios.get('/api/users');
            return users;
        } catch (error) {
            console.log(error)
        };
    },
    getSomeUsers: async function() {
        try {
            const users = await axios.get('/api/users/some/');
            return users;
        } catch (error) {
            console.log(error);
        }
    }
};
