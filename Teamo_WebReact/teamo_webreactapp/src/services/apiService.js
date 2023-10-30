import axios from "axios";
import apiConfig from "../config/apiconfig";

//apiUrl get itself from apiConfig
const axiosService = axios.create({});

//Using HTTP Interceptor
axiosService.interceptors.request.use(
  (request) => {
    const adminAuthToken = "dummyAdminAuthToken";
    console.log(request.method);
    request.headers["Authorization"] = `Bearer ${adminAuthToken}`;
    console.log(request.headers.Authorization);
    return request;
  },
  (error) => {
    return Promise.reject(error, "Restricted page.");
  }
);

axiosService.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const apiService = {
  get: async (apiUrl) => await axiosService.get(apiUrl),
  post: async (apiUrl, data) => await axiosService.post(apiUrl, data),
  put: async (apiUrl, data) => await axiosService.put(apiUrl, data),
  delete: async (apiUrl, id) => await axiosService.delete(apiUrl, { data: id }),
};

//How to use
//apiService.get(apiConfig.getAssignments)

export default apiService;
