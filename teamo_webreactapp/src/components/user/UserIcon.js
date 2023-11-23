import React from "react";

function UserIcon({ userFirstLetter }) {
  const negativeMarginStyle = {
    marginBottom: "-0.25rem", // Adjust as needed
  };

  return (
    <div className="mt-1" >
      <div className="circular-icon">
        <i className={`fa-solid fa-${userFirstLetter} text-light`}></i>
      </div>
    </div>
  );
}

export default UserIcon;
