import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PageContentHeader({ projectId, projectName, projectDescription }) {
  return (
    <div className="container mt-4">
      <div className="d-flex flex-row justify-content-between">
        <div className="col-12 justify-content-around d-flex">

          <div className="col-6 align-items-lg-baseline">
            <h3>
              Project ID: #{projectId}
            </h3>
            <h3 className="text-dark">
              <i className="bi bi-diagram-project"></i>
              Project Name: {projectName}
            </h3>
          </div>

          <div className="d-flex flex-column align-items-end">
            <h5 className="text-dark">{projectDescription}</h5>
            <div >
              <i className="fa-regular fa-circle-user "></i>
              <i className="fa-regular fa-circle-user"></i>
              <i className="fa-regular fa-circle-user"></i>
            </div>
          </div>
        </div>

      </div>
      <hr className="mt-1" />

      <div className="col-md-12 d-flex justify-content-between btn-outline-light ">
        <button className="btn">Summary</button>
        <button className="btn">Assignments</button>
        <button className="btn">Board</button>
        <button className="btn">People</button>
      </div>
    </div>
  );
}

export default PageContentHeader;
