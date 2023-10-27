import React, { useContext, useState } from "react"; // Make sure to import 'useState'
import ButtonCreateProject from "../button/ButtonCreateProject";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";
import axios from "axios";
import { Alert } from "reactstrap";
import { ProjectContext } from "../../store/projectContext";

const EditProjectForm = () => {
  const selectedProjectId = useContext(ProjectContext).selectedProjectId;

  // Step 1: Add state variable for project data and its state setter
  const [projectData, setProjectData] = useState({
    id: 4,
    name: "Game project",
    description: "A project to make a simple game using Unity and C#",
    startDate: "2023-12-01T00:00:00",
    endDate: "2024-01-01T00:00:00",
  });

  const [isSuccessAlertVisible, setSuccessAlertVisible] = useState(false);
  const [isFailureAlertVisible, setFailureAlertVisible] = useState(false);

  const handleEditProject = (e) => {
    const { name, value } = e.target;

    // Step 2: Update project data using the state setter
    setProjectData({ ...projectData, [name]: value });
    console.log(projectData);
  };

  const EditProject = async () => {
    try {
      const res = await axios.put(
        // Use 'await' since axios returns a promise
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
};
export default EditProjectForm;
