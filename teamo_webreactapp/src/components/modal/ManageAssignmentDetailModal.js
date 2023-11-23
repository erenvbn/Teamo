import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EditAssignmentForm from "../forms/EditAssignmentForm";
import CommentAssignmentModal from "./CommentAssignmentModal";
import Assignment from "../assignment/Assignment";
import AssignmentDetail from "../assignment/AssignmentDetail";
import AssignmentComment from "../comment/AssignmentComment";
import AddAssignmentComment from "../comment/AddAssignmentComment";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";
import { splitCommentDate } from "../../utilities/dateUtils";

function ManageAssignmentDetailModal({ assignmentKey, assignment, onClick }) {
  const manageTypeDelete = "Delete";
  const manageTypeEdit = "Edit";
  const manageTypeEnlarge = "Enlarge";
  const [modal, setModal] = useState(false);
  const [manageType, setManageType] = useState(manageTypeDelete);
  const [assignmentComments, setAssignmentComments] = useState([]);

  const toggle = () => setModal(!modal);

  const handleCloseModal = () => {
    setModal((prev) => !prev);
  };
  //Get assignment specific AssignmentComments
  useEffect(() => {
    apiService
      .get(apiConfig.getAssignmentComments + `/${assignmentKey}`)
      .then((res) => {
        setAssignmentComments(res.data);
        console.log("ASSIGNMENTCOMMENTS");
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment comments: ", error);
      });
  }, [assignmentKey]);

  return (
    <div>
      <div className="btn-group mb-2 gap-1">
        {/* Enlarge Assignment Button */}
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
                <i class="fa-solid fa-caret-left"></i>{" "}
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
            <ModalHeader>
              <div>
                <div>Assignment Details</div>
              </div>
              <Button color="primary" onClick={toggle}>
                <i class="fa-solid fa-caret-left"></i>{" "}
              </Button>
              <div></div>
            </ModalHeader>
            <ModalBody>
              <AssignmentDetail
                key={assignmentKey}
                sharedKey={assignmentKey}
                title={assignment.title}
                description={assignment.description}
                startDate={assignment.startDate}
                dueDate={assignment.dueDate}
                priority={assignment.priority}
                status={assignment.status}
              />
              {/* Add specific assignment comments */}

              <div>
                {assignmentComments.map((c) => {
                  const [commentDateDay, commentDateHour] = splitCommentDate(
                    c.commentDate
                  );
                  return (
                    <div key={c.commentId}>
                      <AssignmentComment
                        commentId={c.commentId}
                        commentAssignmentId={c.commentAssignmentId}
                        commentText={c.commentText}
                        userName={c.userName}
                        commentDate={commentDateDay}
                        commentDateHour={commentDateHour}
                      />
                    </div>
                  );
                })}
              </div>
              <div>
                <AddAssignmentComment></AddAssignmentComment>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                <i class="fa-solid fa-caret-left"></i>{" "}
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ManageAssignmentDetailModal;
