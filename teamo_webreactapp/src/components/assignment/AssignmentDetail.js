import React, { useState, useEffect, useContext } from "react";
import { Progress, Card, CardText, CardTitle, Badge } from "reactstrap";
import apiConfig from "../../config/apiconfig";
import apiService from "../../services/apiService";
import ManageAssignmentModal from "../modal/ManageAssignmentModal";
import ManageAssignmentDetailModal from "../modal/ManageAssignmentDetailModal";
import UserIcon from "../user/UserIcon";
import ManageAssignmentUsersModal from "../modal/ManageAssignmentUsersModal";
import "./Assignment.css";
import { ProjectContext } from "../../store/projectContext";
import { splitCommentDate } from "../../utilities/dateUtils";

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
  const { refreshAssignmentUsersFlag } = useContext(ProjectContext);

  useEffect(() => {
    // console.log("refreshAssignmentUsersFlag in Assignment Component true-false");
    console.log(refreshAssignmentUsersFlag);
  }, [refreshAssignmentUsersFlag]);

  //Fetching data for progressbar
  useEffect(() => {
    calculateRemainingDays(dueDate);
  }, [dueDate]);

  //Fetching assignmentUsers
  useEffect(() => {
    // Fetch assignment user data and update state
    apiService
      .get(apiConfig.getAssignmentUser + `/${sharedKey}`)
      .then((res) => {
        setSelectedAssignmentUsers(res.data);
        // console.log("NEW ASSIGNEES FROM")
        // console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment data: ", error);
      });
  }, [sharedKey, refreshAssignmentUsersFlag]);

  const calculateRemainingDays = (dueDate) => {
    const dueDateObj = new Date(dueDate);
    const currentTime = new Date();
    const timeDifference = dueDateObj - currentTime;
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setRemainingDays(remainingDays);
  };

  //Delete assignment method
  const handleDeleteAssignment = (assignmentId) => {
    try {
      apiService.delete(apiConfig.deleteAssignment + `${assignmentId}`);
    } catch (error) {
      console.error("Error while deleting the assignment:", error);
    }
  };

  return (
    <Card className="mb-3 assignment-card">
      <div className="d-flex flex-row justify-content-between m-2 mt-0 mb-0 p-0">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            {/* Status Priority Badges */}
            <div id="PriorityStatusBadges" className="">
              <CardText className="assignment-text p-0 m-0">
                <div>
                  {priority === "Unknown" && (
                    <Badge color="secondary">{priority}</Badge>
                  )}
                  {priority === "Low Priority" && (
                    <Badge color="success">{priority}</Badge>
                  )}
                  {priority === "Neutral" && (
                    <Badge color="secondary">{priority}</Badge>
                  )}
                  {priority === "High Priority" && (
                    <Badge color="warning">{priority}</Badge>
                  )}
                  {priority === "Critical" && (
                    <Badge color="danger">{priority}</Badge>
                  )}
                </div>
              </CardText>

              <CardText className="p-0 m-0">
                <div>
                  {status === "Pending" && (
                    <Badge color="secondary">{status}</Badge>
                  )}
                  {status === "In Process" && (
                    <Badge color="success">{status}</Badge>
                  )}
                  {status === "Completed" && (
                    <Badge color="primary">{status}</Badge>
                  )}
                  {status === "Canceled" && (
                    <Badge color="secondary">{status}</Badge>
                  )}
                </div>
              </CardText>
            </div>

            <div className="m-0 p-0 ">
              {/* USER BUTTON GROUP */}
              <div className="d-flex flex-row align-items-center justify-content-center gap-2 ">
                {/* USERADD BUTTON */}
                <ManageAssignmentUsersModal
                  sharedKey={sharedKey}
                  selectedAssignmentUsers={selectedAssignmentUsers}
                ></ManageAssignmentUsersModal>
                {/* USERICON CREATION */}
                <div className="d-flex flex-row ">
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

            {/* EDIT DELETE ASSIGNMENT BUTTONS */}
            <div className="btn-group">
              <ManageAssignmentDetailModal
                assignmentKey={sharedKey}
                assignment={{
                  title,
                  description,
                  startDate,
                  dueDate,
                  priority,
                  status,
                }}
                onClick={() => handleDeleteAssignment(sharedKey)}
              ></ManageAssignmentDetailModal>
            </div>
          </div>
          <hr className="user-line mt-2 mb-4" />

          <CardTitle className="text-capitalize assignment-title">
            <h3>{title}</h3>
          </CardTitle>
          <CardText className="assignment-description mt-2 mb-5">
            <p>{description}</p>
          </CardText>
          <div className="d-flex mt-5 flex-row justify-content-between">
            <CardText className="assignment-text">
              <p>Start: {splitCommentDate(startDate)[0]}</p>
              <p>Hour: {splitCommentDate(startDate)[1]}</p>
            </CardText>
            <CardText className="assignment-text">
              <p>Due: {splitCommentDate(dueDate)[0]}</p>
              <p>Hour: {splitCommentDate(dueDate)[1]}</p>
            </CardText>
          </div>
        </div>
      </div>
      <hr className="user-line m-0" />
      <div className="d-flex flex-row justify-content-between assignment-info p-0">
        <Progress
          min={0}
          max={100}
          color="success"
          className="w-100 bg-black mt-0 p-0"
          value={remainingDays}
        >
          {remainingDays} days remaining
        </Progress>
      </div>
    </Card>
  );
};

export default Assignment;
