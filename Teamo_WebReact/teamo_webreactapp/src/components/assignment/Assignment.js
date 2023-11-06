import React, { useState, useEffect, useContext } from "react";
import {
  Progress,
  Card,
  CardText,
  CardTitle,
  Badge,
  Row,
  Button,
} from "reactstrap";
import apiConfig from "../../config/apiconfig";
import apiService from "../../services/apiService";
import ButtonDeleteAssignment from "../button/ButtonDeleteAssignment";
import { ProjectContext } from "../../store/projectContext";
import ManageAssignmentModal from "../modal/ManageAssignmentModal";
import UserIcon from "../user/UserIcon";
import UserAddButton from "../user/UserIcon";
import ManageAssignmentUsersModal from "../modal/ManageAssignmentUsersModal";

function Assignment({
  sharedKey,
  title,
  description,
  dueDate,
  priority,
  status,
}) {
  const [remainingDays, setRemainingDays] = useState(0);
  const [selectedAssignmentUsers, setSelectedAssignmentUsers] = useState([]);

  useEffect(() => {
    calculateRemainingDays(dueDate);
  }, [dueDate]);

  useEffect(() => {
    // Fetch assignment user data and update state
    apiService
      .get(apiConfig.getAssignmentUser + `/${sharedKey}`)
      .then((res) => {
        setSelectedAssignmentUsers(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment data: ", error);
      });
  }, [sharedKey]); // Updated the dependency to sharedKey

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
      <div className="d-flex flex-row justify-content-between m-2 mt-0 mb-0 p-0">
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

        {/* USER BUTTON GROUP */}
        <div className="d-flex flex-column align-items-center justify-content-center gap-2 me-3">
          {/* USERADD BUTTON */}
          <ManageAssignmentUsersModal
            sharedKey={sharedKey}
            selectedAssignmentUsers={selectedAssignmentUsers}
          ></ManageAssignmentUsersModal>
          {/* USERICON CREATION */}
          <div>
            {selectedAssignmentUsers.map((selectedAssignmentUser) => (
              <UserIcon
                key={selectedAssignmentUser.id}
                sharedKey={sharedKey}
                userFirstLetter={selectedAssignmentUser.name
                  .charAt(0)
                  .toLowerCase()}
              ></UserIcon>
            ))}
          </div>
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
