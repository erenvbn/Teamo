import React, { useContext, useState } from "react";
import ButtonCreateProject from "../button/ButtonCreateProject";
import ButtonDeleteProject from "../button/ButtonDeleteProject";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";
import axios from "axios";
import { Alert } from "reactstrap";
import { ProjectContext } from "../../store/projectContext";

const EditProjectForm = () => {
  const selectedProjectId = useContext(ProjectContext).selectedProjectId;
  const selectedProjectData = useContext(ProjectContext).selectedProjectData;

  // Step 1: Add state variable for project data and its state setter
  const [projectData, setProjectData] = useState({
    id: 4,
    name: "Game project",
    description: "A project to make a simple game using Unity and C#",
    startDate: "2023-12-01T00:00:00",
    endDate: "2024-01-01T00:00:00",
  });

  // State for delete input content
  const [deleteInputContent, setDeleteInputContent] = useState("");

  // States of visibility of alerts
  const [isSuccessAlertVisible, setSuccessAlertVisible] = useState(false);
  const [isFailureAlertVisible, setFailureAlertVisible] = useState(false);

  // Settings of deleteInputLabel
  const deleteInputLabelType = `delete Project ID:${selectedProjectId}`;
  const deleteInputLabel = `To delete, type '${deleteInputLabelType}' in the box below`;

  // Continuous update when deleting a project
  const handleDeleteProject = (e) => {
    const { value } = e.target;
    // Step 2: Update delete input content using the state setter
    setDeleteInputContent(value);
    console.log("DeleteBox Content:" + deleteInputContent);
    console.log("Label:" + deleteInputLabel);
    console.log("LabelType:" + deleteInputLabelType);
    console.log(selectedProjectId);
    console.log(apiConfig.deleteProject + `${selectedProjectId}`);
  };

  // What happens when deleting a project
  const DeleteProject = () => {
    try {
      console.log(selectedProjectId);
      console.log(apiConfig.deleteProject + `${selectedProjectId}`);
      if (deleteInputContent === deleteInputLabelType) {
        apiService.delete(apiConfig.deleteProject + `${selectedProjectId}`);
      }
    } catch (error) {
      console.error("Error while deleting the project:", error);
      setFailureAlertVisible(true);
    }
  };

  // Continuous update when editing a project
  const handleEditProject = (e) => {
    const { name, value } = e.target;
    // Step 2: Update project data using the state setter
    setProjectData({ ...projectData, [name]: value });
    console.log(projectData);
  };

  // What happens when editing a project
  const EditProject = async () => {
    try {
      const res = await axios.put(
        `https://localhost:7001/api/Project/${selectedProjectId}`,
        projectData
      );
      console.log("Project has been edited:", res);
      setSuccessAlertVisible(true);
    } catch (error) {
      console.error("Error while editing a project:", error);
      setFailureAlertVisible(true);
    }
  };

  return (
    <div className="flex-row col-12">
      <div id="panel">
        <form
          id="editProjectForm"
          method="post"
          className="d-grid gap-2 row m-3"
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
              placeholder={projectData.name}
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
              placeholder={projectData.description}
              onChange={handleEditProject}
            ></textarea>
          </div>
          <div>
            <label htmlFor="projectStartDate">Start Date:</label>
            <input
              type="date"
              className="form-control"
              id="projectStartDateInput"
              name="startDate"
              value={projectData.startDate}
              placeholder={projectData.startDate}
              onChange={handleEditProject}
            />
          </div>
          <div>
            <label htmlFor="projectEndDate">End Date:</label>
            <input
              type="date"
              className="form-control"
              id="projectEndDateInput"
              name="endDate"
              value={projectData.endDate}
              placeholder={projectData.endDate}
              onChange={handleEditProject}
            />
          </div>
          <Alert isOpen={isSuccessAlertVisible} color="info">
            {" "}
            The project has been edited successfully
          </Alert>
          <Alert isOpen={isFailureAlertVisible} color="red">
            {" "}
            The project has not been edited
          </Alert>
          <ButtonCreateProject
            buttonText={"Edit Project"}
            onProjectEdit={EditProject}
          ></ButtonCreateProject>
          <div>
            <form className="d-flex flex-column justify-content-around">
              <div className="mt-5">
                <label htmlFor="deleteInput">{deleteInputLabel}</label>
                <input
                  type="text"
                  className="form-control"
                  id="deleteInputBox"
                  name="deleteInput"
                  value={deleteInputContent}
                  onChange={handleDeleteProject}
                />
              </div>
              <div className="text-end">
                <ButtonDeleteProject
                  buttonText={"Delete Project"}
                  onProjectDelete={DeleteProject}
                ></ButtonDeleteProject>
              </div>
            </form>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectForm;

// https://localhost:7001/api/Project?id=2

// https://localhost:7001/api/Project?id=5
