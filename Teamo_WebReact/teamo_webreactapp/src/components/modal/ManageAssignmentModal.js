import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EditAssignmentForm from "../forms/EditAssignmentForm";

function ManageAssignmentModal({ assignmentKey, onClick }) {
  const manageTypeDelete = "Delete";
  const manageTypeEdit = "Edit";
  const [modal, setModal] = useState(false);
  const [manageType, setManageType] = useState(manageTypeDelete);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className="btn-group mb-2">
        {/* Edit Assignment Button */}
        <Button
          assignmentKey={assignmentKey}
          className="border-0 btn-info btn-sm"
          onClick={() => {
            setManageType(manageTypeEdit);
            console.log(manageType);
            toggle();
          }}
        >
          <i className="fa-solid fa-ellipsis"></i>{" "}
        </Button>

        {/* Delete Assignment Button */}
        <Button
          color="danger"
          className="border-0 btn-danger btn-sm"
          onClick={() => {
            setManageType(manageTypeDelete);
            console.log(manageType);

            toggle();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
          {""}
        </Button>
      </div>
      {manageType === manageTypeDelete ? (
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
      ) : (
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
    </div>
  );
}

export default ManageAssignmentModal;
