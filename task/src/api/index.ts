import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../enums';
import {navigate} from '../utils/navigation';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  async request => {
    const token = await AsyncStorage.getItem(CONSTANTS.API_TOKEN);

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  error => {
    console.warn('HTTP :: Request Error', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async response => {
    if (response.status === 401) {
      navigate('LoginScreen');
      return Promise.reject(new Error());
    }
    return response;
  },
  error => {
    console.warn('HTTP :: Request Error', error);

    if (error?.message === 'Request failed with status code 401') {
      navigate('LoginScreen');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
