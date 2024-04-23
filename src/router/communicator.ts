import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("userToken");
  return token;
};

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Aziza__${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }
        const response = await axiosInstance.post("/auth/refresh", {
          refreshToken: `Aziza__${refreshToken}`,
        });
        const newToken = response.data.token;
        localStorage.setItem("userToken", newToken);
        originalRequest.headers.Authorization = `Aziza__${newToken}`;
        return axiosInstance(originalRequest);
      } catch (error: any) {
        const status = error.response?.status || 500;
        return Promise.reject({ status });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
