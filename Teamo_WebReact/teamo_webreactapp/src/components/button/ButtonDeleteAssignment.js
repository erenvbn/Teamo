import React from "react";
import { Progress } from "reactstrap";

function ButtonDeleteProject({ onClick, buttonText, buttonKey }) {
  return (
    <div>
      <button
        type="submit"
        className="border-0 btn-danger btn-sm"
        onClick={() => onClick(buttonKey)}
        // Pass the postedProject to the click handler
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ButtonDeleteProject;
