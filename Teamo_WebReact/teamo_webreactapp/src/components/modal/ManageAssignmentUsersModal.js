import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Card,
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
  const [assignationToggle, setAssignationToggle] = useState(false);

  //FETCHING ALL USERS and SETTING UNASSIGNED USERS
  useEffect(() => {
    apiService
      .get(apiConfig.getUsers)
      .then((res) => {
        setAllUsersArray(res.data);
        const allUsers = res.data;
        const unAssignedUsersArray = AssigneeSeparator(
          allUsers,
          selectedAssignmentUsers
        );
        setUnassignedUsersArray(unAssignedUsersArray);
        setAssignedUsersArray(selectedAssignmentUsers);
      })
      .catch((error) => {
        console.error("Error while getting all users:", error);
      });
  }, [assignationToggle]);

  // console.log("unAssignedUsersArray");
  // console.log(unAssignedUsersArray);
  // console.log("assignedUsersArray");
  // console.log(assignedUsersArray);

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

  //GET CLICKED BUTTONID
  const changeAssignationStatus = (clickedButtonId) => {
    setClickedUserId(clickedButtonId);
    // console.log("clickedUserId");
    // console.log(clickedButtonId);
    unAssignedUsersArray.forEach((user) => {
      if (user.id == clickedButtonId) {
        const indexUser = unAssignedUsersArray.indexOf(user);

        unAssignedUsersArray.splice(indexUser, 1);

        assignedUsersArray.push(user);
        //setAssignedUsersArray(assignedUsersArray);
        //setUnassignedUsersArray(unAssignedUsersArray);

        setAssignationToggle((prevToggle) => !prevToggle);
      }
    });
    // setUnassignedUsersArray(unAssignedUsersArray);
    assignedUsersArray.forEach((user) => {
      if (user.id == clickedButtonId) {
        const indexUser = assignedUsersArray.indexOf(user);

        assignedUsersArray.splice(indexUser, 1);
        //setAssignedUsersArray(assignedUsersArray);

        unAssignedUsersArray.push(user);
        //setUnassignedUsersArray(unAssignedUsersArray);

        setAssignationToggle((prevToggle) => !prevToggle);
      }
    });
  };
  // setAssignedUsersArray(assignedUsersArray);

  console.log("unAssignedUsersArray");
  console.log(unAssignedUsersArray);
  console.log("assignedUsersArray");
  console.log(assignedUsersArray);

  return (
    <div>
      <Button
        onClick={toggle}
        className="circular-icon-function btn-animation-green border-0 btn-sm"
      >
        <i class="fa-solid fa-plus text-light "></i>{" "}
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
              {/* MIDDLE*/}
            </Container>
            <Container className="d-flex col-2">
              <div className="d-flex flex-row align-items-center ">
                <i className="fa-solid fa-arrow-right-arrow-left "></i>{" "}
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
          <Button color="primary" onClick={toggle}>
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
