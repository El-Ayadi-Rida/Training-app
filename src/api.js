import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1',
  });

  // Add a request interceptor
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      console.log(originalRequest);
  
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest.isRetry) {
        originalRequest.isRetry  = true;
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post('https://api.escuelajs.co/api/v1/auth/refresh-token', { refreshToken });
          const { token } = response.data;
          const newAccessToken = response.data.access_token
          const newRefreshToken = response.data.refresh_token;
  
          localStorage.setItem('token', newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Handle refresh token error or redirect to login
        }
      }
  
      return Promise.reject(error);
    }
  );




  export default api;
