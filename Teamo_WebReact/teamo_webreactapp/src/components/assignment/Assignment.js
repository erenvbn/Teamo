import React, { useState, useEffect } from "react";
import { Progress, Card, CardText, CardTitle, Badge } from "reactstrap";
import apiConfig from "../../config/apiconfig";
import apiService from "../../services/apiService";
import ManageAssignmentModal from "../modal/ManageAssignmentModal";
import UserIcon from "../user/UserIcon";
import ManageAssignmentUsersModal from "../modal/ManageAssignmentUsersModal";
import "./Assignment.css";

const Assignment = ({
  sharedKey,
  title,
  description,
  startDate,
  dueDate,
  priority,
  status,
}) => {
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
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment data: ", error);
      });
  }, [sharedKey]);

  const calculateRemainingDays = (dueDate) => {
    const dueDateObj = new Date(dueDate);
    const currentTime = new Date();
    const timeDifference = dueDateObj - currentTime;
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
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
    <Card className="mb-3 assignment-card">
      <div className="d-flex flex-row justify-content-between m-2 mt-0 mb-0 p-0">

        
        <div className="card-body vertical-line">
          <div className="d-flex justify-content-start gap-1">
            <CardText className="assignment-text">
              <p>
                <Badge color="info">{priority}</Badge>
              </p>
            </CardText>
            <CardText className="assignment-text">
              <p>
                <Badge color="success">{status}</Badge>
              </p>
            </CardText>


            {/* USER BUTTON GROUP */}
            <div className="d-flex flex-row align-items-center justify-content-center gap-2 ">
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
          <hr className="user-line mt-0" />

          <CardTitle className="text-capitalize assignment-title">
            <h3>{title}</h3>
          </CardTitle>
          <CardText className="assignment-description">
            <p>{description}</p>
          </CardText>
          <div className="mt-4">
            <CardText className="assignment-text">
              <p>Start Date: {startDate}</p>
            </CardText>
            <CardText className="assignment-text">
              <p>Due Date: {dueDate}</p>
            </CardText>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-row justify-content-between assignment-info">
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
};

export default Assignment;
