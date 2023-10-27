import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectContext } from "../../../store/projectContext";

function PageContentHeader({ projectId, projectName, projectDescription }) {
  const { selectedProjectId, selectedProjectData } = useContext(ProjectContext);
  return (
    <div className="container mt-4">
      <div className="d-flex flex-row justify-content-between">
        <div className="col-12 justify-content-around d-flex">
          <div className="col-6 align-items-lg-baseline">
            <h3>Project ID: #{selectedProjectId}</h3>
            <h3 className="text-dark">
              <i className="bi bi-diagram-project"></i>
              Project Name: {selectedProjectData.name}
            </h3>
          </div>

          <div className="d-flex flex-column align-items-end">
            <h5 className="text-dark">{selectedProjectData.description}</h5>
            <div>
              <i className="fa-regular fa-circle-user "></i>
              <i className="fa-regular fa-circle-user"></i>
              <i className="fa-regular fa-circle-user"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageContentHeader;
