import React from "react";

function ButtonSubmit({ buttonid, onClick, text }) {
  return (
    <button className="btn btn-primary mt-1"
    onClick={() =>
    onClick(buttonid)}
    type="button">
      {text}
    </button>
  );
}

export default ButtonSubmit;
