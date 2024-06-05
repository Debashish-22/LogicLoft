import axios from 'axios';

import { parse } from 'cookie';

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_API,
  withCredentials: true
});

axiosInstance.interceptors.request.use(

  config => {
    
    if(typeof document !== 'undefined'){

      const cookies = parse(document.cookie);

      if(cookies){

        const appToken = cookies[process.env.AUTH_TOKEN || ''];
        const deviceId = cookies[process.env.DEVICE_TOKEN || ''];

        if(appToken && deviceId){
          config.headers['Authorization'] = `Bearer ${appToken}`;
        }
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

let authUpdateCallback: (() => void) | null = null;

axiosInstance.interceptors.response.use(
  response => {

    const { message } = response.data;

    if(message === "TOKEN_INVALID" || message === "TOKEN_EXPIRED" || message === "UNAUTHORIZED"){
      authUpdateCallback?.();
    }

    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export const setAuthUpdateCallback = (callback: (() => void) | null) => {
  authUpdateCallback = callback;
};

export default axiosInstance;