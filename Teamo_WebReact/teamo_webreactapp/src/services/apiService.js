import axios from "axios";
import apiConfig from "../config/apiconfig";

//apiUrl get itself from apiConfig

const apiService = {
  get: async (apiUrl) => await axios.get(apiUrl),
  post: async (apiUrl, data) => await axios.post(apiUrl,data),
  put: async (apiUrl, data) => await axios.post(apiUrl,data),
  delete: async (apiUrl, id) => await axios.post(apiUrl, id),
};

//How to use
//apiService.get(apiConfig.getAssignments)

export default apiService;
