import React from "react";

function ButtonAddProject({ buttonid, onClickPass, text }) {
  return (
    <button className="btn btn-outline-dark">
      <i className="fa-solid fa-folder-plus"></i>
    </button>
  );
}

export default ButtonAddProject;