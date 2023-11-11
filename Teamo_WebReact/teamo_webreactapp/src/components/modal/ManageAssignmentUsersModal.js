import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";
import UserBadge from "../user/UserBadge";

function ManageAssignmentUsersModal({ sharedKey, selectedAssignmentUsers }) {
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [allUsersArray, setAllUsersArray] = useState([]);
  const [clickedUserId, setClickedUserId] = useState();
  const [unAssignedUsersArray, setUnassignedUsersArray] = useState([]);
  const [assignedUsersArray, setAssignedUsersArray] = useState([]);
  const [assignmentUserUpdateDTO, setAssignmentUserUpdateDTO] = useState({
    AssignmentId: sharedKey,
    UserIds: [],
  });

  //FETCHING ALL USERS and SETTING UNASSIGNED USERS
  useEffect(() => {
    apiService
      .get(apiConfig.getUsers)
      .then((res) => {
        const allUsers = res.data;
        setAllUsersArray(allUsers);

        const unAssignedUsers = AssigneeSeparator(
          allUsers,
          selectedAssignmentUsers
        );
        setUnassignedUsersArray(unAssignedUsers);
        setAssignedUsersArray(selectedAssignmentUsers);
      })
      .catch((error) => {
        console.error("Error while getting all users:", error);
      });
  }, [selectedAssignmentUsers]);

  //ASSIGNED-UNASSIGNED SEPARATOR FUNCTION
  const AssigneeSeparator = (allUsersArray, assignedUsersArray) => {
    if (!assignedUsersArray) {
      return allUsersArray;
    }
    const assignedUserIds = assignedUsersArray.map((user) => user.id);
    const unAssignedUsersArray = allUsersArray.filter(
      (user) => !assignedUserIds.includes(user.id)
    );
    return unAssignedUsersArray;
  };

  // GET CLICKED BUTTONID
  const changeAssignationStatus = (clickedButtonId) => {
    setClickedUserId(clickedButtonId);

    const isUserIdInUnassigned = unAssignedUsersArray.find(
      (u) => u.id === clickedButtonId
    );
    const isUserIdInAssigned = assignedUsersArray.find(
      (u) => u.id === clickedButtonId
    );

    if (isUserIdInUnassigned) {
      const updatedUnassignedUsers = unAssignedUsersArray.filter(
        (u) => u.id !== clickedButtonId
      );
      const userToMove = unAssignedUsersArray.find(
        (u) => u.id === clickedButtonId
      );
      setUnassignedUsersArray(updatedUnassignedUsers);

      const updatedAssignedUsers = [...assignedUsersArray, userToMove];
      setAssignedUsersArray(updatedAssignedUsers);


      console.log(assignedUsersArray);
    } else if (isUserIdInAssigned) {
      const updatedAssignedUsers = assignedUsersArray.filter(
        (u) => u.id !== clickedButtonId
      );
      setAssignedUsersArray(updatedAssignedUsers);

      const userToMove = assignedUsersArray.find(
        (u) => u.id === clickedButtonId
      );
      const updatedUnassignedUsers = [...unAssignedUsersArray, userToMove];
      setUnassignedUsersArray(updatedUnassignedUsers);

      console.log("unAssignedUsersArray");
      console.log(unAssignedUsersArray);
    }
  };

  //Sending request for managing assignmentusers of a particular assignment
  useEffect(() => {
    // Check if UserIds array is not empty before making the API call
    if (assignmentUserUpdateDTO.UserIds.length > 0) {
      apiService
        .post(apiConfig.postManageAssignmentUsers, assignmentUserUpdateDTO)
        .then((res) => {
          console.log("Response status:", res.status);
        })
        .catch((error) => {
          console.error("Error while posting assignmentUsers data:", error);
        });
    }
  }, [assignmentUserUpdateDTO]);

  //ManageAssignmentUser for creating request body for assignmentusers
  function ManageAssignmentUsers(sharedKey, assignedUsersArray) {
    const usersIdsArray = assignedUsersArray.map((user) => user.id);
    console.log("usersIdsArray in manageassignmentUsers");
    console.log(usersIdsArray);

    setAssignmentUserUpdateDTO({
      AssignmentId: sharedKey,
      UserIds: usersIdsArray,
    });
    console.log("ÖNEMLİ GİDEN PAKET AssignmentUserUpdateDTO");
    console.log(assignmentUserUpdateDTO);
  }

  return (
    <div>
      <Button
        onClick={toggle}
        className="circular-icon-function btn-animation-green border-0 btn-sm"
      >
        <i className="fa-solid fa-plus text-light "></i>{" "}
      </Button>
      <Modal
        backdrop={false}
        isOpen={modal}
        toggle={toggle}
        fade={false}
        scrollable={false}
        centered={true}
      >
        <ModalHeader toggle={toggle}>Manage Assignment: Assignees</ModalHeader>
        <ModalBody>
          <Container className="d-flex flex-row justify-content-around">
            {/* UNASSIGNED */}
            <Container className="text-start col-5">
              <h3>Unassigned</h3>
              {unAssignedUsersArray.map((unAssignedUser) => {
                return (
                  <UserBadge
                    key={unAssignedUser.id}
                    buttonKey={unAssignedUser.id}
                    onClick={changeAssignationStatus}
                    userId={unAssignedUser.id}
                    userName={unAssignedUser.name}
                  ></UserBadge>
                );
              })}
            </Container>
            {/* MIDDLE */}
            <Container className="d-flex col-2">
              <div className="d-flex flex-row align-items-center">
                <i className="fa-solid fa-arrow-right-arrow-left"></i>{" "}
              </div>
            </Container>
            {/* ASSIGNED */}
            <Container className="text-end col-5">
              <h3>Assignees</h3>
              {assignedUsersArray.map((assignedUser) => {
                return (
                  <UserBadge
                    key={assignedUser.id}
                    buttonKey={assignedUser.id}
                    onClick={changeAssignationStatus}
                    userId={assignedUser.id}
                    userName={assignedUser.name}
                  ></UserBadge>
                );
              })}
            </Container>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              ManageAssignmentUsers(sharedKey, assignedUsersArray);
            }}
          >
            Manage Assignees
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ManageAssignmentUsersModal;
