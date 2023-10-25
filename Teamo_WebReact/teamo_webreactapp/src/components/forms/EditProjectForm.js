import React, { useEffect } from "react";
import { useState } from "react";
import ButtonCreateProject from "../button/ButtonCreateProject";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";
import axios from "axios";
import { Alert } from "reactstrap";

function EditProjectForm(selectedProjectData) {
  const [projectData, setProjectData] = useState({
    id: 1,
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [isSuccessAlertVisible, setSuccessAlertVisible] = useState(false);
  const [isFailureAlertVisible, setFailureAlertVisible] = useState(false);

  const handleEditProject = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
    console.log(projectData);
  };

  const FillProjectDetails = () => {};

  const GetProject = async () => {
    try {
      const res = await axios.post(
        "https://localhost:7001/api/Project",
        projectData
      );
      //const res = await apiService.post(apiConfig.postProject, projectData);
      console.log("Project has been edited:", res);
      setSuccessAlertVisible(true);
    } catch (error) {
      console.error("Error while creating a project:", error);
      setFailureAlertVisible(true);
    }
  };

  const EditProject = async () => {
    try {
      const res = await axios.post(
        "https://localhost:7001/api/Project",
        projectData
      );
      //const res = await apiService.post(apiConfig.postProject, projectData);
      console.log("Project has been edited:", res);
      setSuccessAlertVisible(true);
    } catch (error) {
      console.error("Error while creating a project:", error);
      setFailureAlertVisible(true);
    }
  };

  return (
    // <!-- Edit project Form  -->
    <div className="flex-row col-12 justify-content-between">
      <div id="panel">
        <form
          id="editProjectForm"
          method="post"
          className="d-grid gap-2 row m-3 col-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              name="name"
              value={projectData.name}
              onChange={handleEditProject}
            />
          </div>
          <div>
            <label htmlFor="projectDescription">Description:</label>
            <textarea
              className="form-control"
              id="projectDescriptionInput"
              name="description"
              value={projectData.description}
              rows="4"
              onChange={handleEditProject}
            ></textarea>
          </div>
          <div>
            <label htmlFor="projectDueDate">Start Date:</label>
            <input
              type="date"
              className="form-control"
              id="projectStartDateInput"
              name="startDate"
              value={projectData.startDate}
              onChange={handleEditProject}
            />
          </div>
          <div>
            <label htmlFor="projectDueDate">End Date:</label>
            <input
              type="date"
              className="form-control"
              id="projectEndDateInput"
              name="endDate"
              value={projectData.endDate}
              onChange={handleEditProject}
            />
          </div>
          <ButtonCreateProject
            onProjectEdit={EditProject}
          ></ButtonCreateProject>
          <Alert isOpen={isSuccessAlertVisible} color="info">
            {" "}
            The project has been edited successfully
          </Alert>
          <Alert isOpen={isFailureAlertVisible} color="red">
            {" "}
            The project has been not been edited
          </Alert>
        </form>
      </div>
    </div>
  );
}

export default EditProjectForm;
