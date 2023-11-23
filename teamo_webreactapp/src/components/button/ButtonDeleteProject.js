import React from "react";
import { Progress } from "reactstrap";

function ButtonCreateProject({ onProjectDelete, buttonText }) {
  return (
    <div>
      <button
        type="submit"
        className="btn btn-danger border-0 bg-feedback-error text-black mt-2"
        onClick={() => onProjectDelete()} // Pass the postedProject to the click handler
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ButtonCreateProject;
