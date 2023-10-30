//BaseURLs
const baseConfig = {
  dev: {
    apiBaseUrl: "https://localhost:7001/api/",
  },
  prod: {
    apiBaseUrl: "https://localhost:7002/api/",
  },
};

//ProjectStage
const devStage = "dev";

//Selected BaseURL
const apiBaseUrl = baseConfig[devStage].apiBaseUrl;

//Endpoints in strings
const apiConfig = {
  getAssignments: `${apiBaseUrl}Assignment`,
  getProjects: `${apiBaseUrl}Project`,
  getUsers: `${apiBaseUrl}User`,
  getComments: `${apiBaseUrl}Comment`,

  postProject: `${apiBaseUrl}Project`,
  postAssignment: `${apiBaseUrl}Assignment`,
  postUser: `${apiBaseUrl}User`,
  postComment: `${apiBaseUrl}Comment`,

  deleteProject: `${apiBaseUrl}Project`,
  deleteAssignment: `${apiBaseUrl}Assignment`,
  deleteUser: `${apiBaseUrl}User`,
  deleteComment: `${apiBaseUrl}Comment`,

  updateProject: `${apiBaseUrl}Project`,
  updateAssignment: `${apiBaseUrl}Assignment`,
  updateUser: `${apiBaseUrl}User`,
  updateComment: `${apiBaseUrl}Comment`,
};

export default apiConfig;
