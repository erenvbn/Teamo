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
  //GET METHODS
  getAssignments: `${apiBaseUrl}Assignment`,
  getProjects: `${apiBaseUrl}Project`,
  getUsers: `${apiBaseUrl}User`,
  getComments: `${apiBaseUrl}Comment`,
  getProjectAssignments: `${apiBaseUrl}Project/projectassignments`,
  getProjectComments: `${apiBaseUrl}Comment/projectcomment`,
  getProjectUser: `${apiBaseUrl}AssignmentUser/projectUser`,
  getAssignmentUser:`${apiBaseUrl}AssignmentUser/assignmentUser`,

  //POST METHODS
  postProject: `${apiBaseUrl}Project`,
  postAssignment: `${apiBaseUrl}Assignment`,
  postUser: `${apiBaseUrl}User`,
  postComment: `${apiBaseUrl}Comment`,
  postAssignmentUser: `${apiBaseUrl}AssignmentUser/CreateAssignmentUser`,
  postManageAssignmentUsers: `${apiBaseUrl}AssignmentUser/ManageAssignmentUserUpdate`,
  
  //DELETE METHODS
  deleteProject: `${apiBaseUrl}Project?id=`,
  deleteAssignment: `${apiBaseUrl}Assignment/api/removeAssignment?id=`,
  deleteUser: `${apiBaseUrl}User`,
  deleteComment: `${apiBaseUrl}Comment`,

  //PUT METHODS
  updateProject: `${apiBaseUrl}Project`,
  updateAssignment: `${apiBaseUrl}Assignment`,
  updateUser: `${apiBaseUrl}User`,
  updateComment: `${apiBaseUrl}Comment`,
};

export default apiConfig;
