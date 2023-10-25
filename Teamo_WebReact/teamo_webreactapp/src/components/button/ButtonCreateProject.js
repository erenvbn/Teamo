import React from "react";
import { Progress } from "reactstrap";

function ButtonCreateProject({ onProjectCreate}) {

  return (
    <div>
      <button
        type="submit"
        className="btn btn-secondary border-0 bg-feedback-success text-black mt-2"
        onClick={() => onProjectCreate()} // Pass the postedProject to the click handler
      >
        Create Project
      </button>
    </div>
  );
}

export default ButtonCreateProject;
