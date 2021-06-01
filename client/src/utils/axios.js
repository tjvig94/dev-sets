import axios from 'axios';

const instance = axios.create({
    baseURL: "https://devsets.herokuapp.com/"
});

export default instance;
