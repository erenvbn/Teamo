import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EditAssignmentForm from "../forms/EditAssignmentForm";
import CommentAssignmentModal from "./CommentAssignmentModal";
import Assignment from "../assignment/Assignment";
import AssignmentComment from "../comment/AssignmentComment";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";
import { splitCommentDate } from "../../utilities/dateUtils";

function ManageAssignmentModal({ assignmentKey, assignment, onClick }) {
  const manageTypeDelete = "Delete";
  const manageTypeEdit = "Edit";
  const manageTypeEnlarge = "Enlarge";
  const [modal, setModal] = useState(false);
  const [manageType, setManageType] = useState(manageTypeDelete);
  const [assignmentComments, setAssignmentComments] = useState([]);

  const toggle = () => setModal(!modal);

  //Get assignment specific AssignmentComments
  useEffect(() => {
    apiService
      .get(apiConfig.getAssignmentComments + `/${assignmentId}`)
      .then((res) => {
        setAssignmentComments(res.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment comments: ", error);
      });
  }, [assignmentId]);

  return (
    <div>
      <div className="btn-group mb-2 gap-1">
        {/* Enlarge Assignment Button */}
        <Button
          className="border-0 btn-dark btn-sm"
          onClick={() => {
            setManageType(manageTypeEnlarge);
            toggle();
          }}
        >
          <i className="fa-solid fa-up-right-and-down-left-from-center"></i>{" "}
          {""}
        </Button>
        {/* Edit Assignment Button */}
        <Button
          assignmentKey={assignmentKey}
          className="border-0 btn-info btn-sm"
          onClick={() => {
            setManageType(manageTypeEdit);
            toggle();
          }}
        >
          <i className="fa-solid fa-ellipsis"></i>{" "}
        </Button>

        {/* Delete Assignment Button */}
        <Button
          className="border-0 btn-danger btn-sm"
          onClick={() => {
            setManageType(manageTypeDelete);
            toggle();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
          {""}
        </Button>
      </div>
      {manageType === manageTypeDelete && (
        <>
          <Modal isOpen={modal} fade={false} toggle={toggle}>
            <ModalHeader toggle={toggle}>Delete Assignment</ModalHeader>
            <ModalBody>
              Are you sure you want to remove the Assignment Id: {assignmentKey}
              ?
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => {
                  onClick(assignmentKey);
                  toggle();
                }}
              >
                Yes
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                No
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
      {manageType === manageTypeEdit && (
        <>
          <Modal isOpen={modal} fullscreen="md" toggle={toggle}>
            <ModalHeader>Edit Assignment</ModalHeader>
            <ModalBody>
              <EditAssignmentForm
                editedAssignmentId={assignmentKey}
              ></EditAssignmentForm>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                Return to Page
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
      {manageType === manageTypeEnlarge && (
        <>
          <Modal
            isOpen={modal}
            scrollable={true}
            size="xl"
            centered={true}
            toggle={toggle}
          >
            <ModalHeader>Assignment Details</ModalHeader>
            <ModalBody>
              <Assignment
                key={assignmentKey}
                sharedKey={assignmentKey}
                title={assignment.title}
                description={assignment.description}
                startDate={assignment.startDate}
                dueDate={assignment.dueDate}
                priority={assignment.priority}
                status={assignment.status}
              />
              <div>{assig}</div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                Return to Page
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ManageAssignmentModal;
