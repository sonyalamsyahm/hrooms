import axios from 'axios';

export const URL = axios.create({
  baseURL: 'http://192.168.1.28:5000/api/v2',
});

export const setHeaderAuth = token => {
  URL.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  // console.log(URL.defaults.headers.common['Authorization']);
};
