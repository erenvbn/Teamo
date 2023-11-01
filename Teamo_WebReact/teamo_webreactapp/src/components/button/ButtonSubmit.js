import React, { useContext } from "react";
import { ProjectContext } from "../../store/projectContext";

function ButtonSubmit({ buttonid, text }) {
  // Access the selectedProjectId and setSelectedProjectId from ProjectContext
  const { selectedProjectId, setSelectedProjectData, setSelectedProjectId } =
    useContext(ProjectContext);

  const handleClick = () => {
    // Update the selectedProjectId when the button is clicked
    setSelectedProjectId(buttonid);
  };

  return (
    <button
      className="btn btn-outline-light mt-1 text-capitalize text-dark"
      onClick={handleClick}
      type="button"
    >
      {text}
    </button>
  );
}

export default ButtonSubmit;
