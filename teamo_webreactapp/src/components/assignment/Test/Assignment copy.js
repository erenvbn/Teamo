import React, { useState, useEffect, useContext } from "react";
import { Progress, Card, CardText, CardTitle, Badge } from "reactstrap";
import apiConfig from "../../../config/apiconfig";
import apiService from "../../../services/apiService";
import ButtonDeleteAssignment from "../../button/ButtonDeleteAssignment";
import { ProjectContext } from "../../../store/projectContext";
import ManageAssignmentModal from "../../modal/ManageAssignmentModal";

function Assignment({
  sharedKey,
  title,
  description,
  dueDate,
  priority,
  status,
}) {
  const selectedProjectId = useContext(ProjectContext).selectedProjectId;
  const [remainingDays, setRemainingDays] = useState(0);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(1);

  useEffect(() => {
    calculateRemainingDays(dueDate);
  }, [dueDate]);

  const calculateRemainingDays = (dueDate) => {
    const dueDateObj = new Date(dueDate);
    const currentTime = new Date();
    const timeDifference = dueDateObj - currentTime;
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Use Math.ceil to round up
    setRemainingDays(remainingDays);
  };

  const handleDeleteAssignment = (assignmentId) => {
    try {
      apiService.delete(apiConfig.deleteAssignment + `${assignmentId}`);
      console.log("Assignment has been deleted.");
    } catch (error) {
      console.error("Error while deleting the assignment:", error);
    }
  };

  return (
    <Card className="mb-3 bg-body-tertiary">
      <div
        className="d-flex flex-row 
      justify-content-between m-2 mt-0 mb-0 p-0"
      >
        <div className="card-body">
          <CardTitle className="text-capitalize">
            <p>{title}</p>
          </CardTitle>
          <CardText>
            <p>{description}</p>
          </CardText>
          <CardText>
            <p>Due Date: {dueDate}</p>
          </CardText>
          <CardText>
            <p>
              Priority: <Badge color="info">{priority}</Badge>
            </p>
          </CardText>
          <CardText>
            <p>
              Status: <Badge color="success">{status}</Badge>
            </p>
          </CardText>
        </div>
        <div className="d-flex flex-column justify-content-center gap-1 me-2">
          <i className="fa-regular fa-circle-user"></i>
          <i className="fa-regular fa-circle-user"></i>
          <i className="fa-regular fa-circle-user"></i>
          <i className="fa-regular fa-circle-user"></i>
          <i className="fa-regular fa-circle-user"></i>
        </div>
      </div>
      <div className="container d-flex flex-row justify-content-between">
        <Progress
          min={0}
          max={100}
          color="success"
          className="w-50 bg-black"
          value={remainingDays}
        >
          {remainingDays} days remaining
        </Progress>
        <div className="btn-group me-2 mb-2">
          <ManageAssignmentModal
            assignmentKey={sharedKey}
            onClick={() => handleDeleteAssignment(sharedKey)}
          ></ManageAssignmentModal>
        </div>
      </div>
    </Card>
  );
}

export default Assignment;
