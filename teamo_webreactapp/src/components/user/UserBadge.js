import React from "react";
import { Button } from "reactstrap";

function UserBadge({userName, userId, onClick }) {
  const negativeMarginStyle = {
    marginBottom: "-0.25rem", // Adjust as needed
  };
  

  return (
    <div className="mt-1">
      <Button onClick={()=>{onClick(userId)}} key={userId}>
        {userId}- {userName}
      </Button>
    </div>
  );
}

export default UserBadge;
