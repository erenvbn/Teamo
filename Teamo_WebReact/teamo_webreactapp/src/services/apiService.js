import axios from "axios";
import apiConfig from "../config/apiconfig";

//apiUrl get itself from apiConfig

const apiService = {
  get: (apiUrl) => axios.get(apiUrl),
  post: (apiUrl, data) => axios.post(apiUrl),
  put: (apiUrl, data) => axios.post(apiUrl),
  delete: (apiUrl) => axios.post(apiUrl),
};

//How to use
//apiService.get(apiConfig.getAssignments)

export default apiService;
