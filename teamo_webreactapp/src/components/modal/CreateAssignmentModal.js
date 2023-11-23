import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CreateAssignmentForm from "../forms/CreateAssignmentForm";

function CreateAssignmentModal(props) {
  const [modalToggle, setModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedProjectId, setSelectedProject] = useState(1);

  //Function that is changing current modal to its reverse
  const toggle = () => setModal(!modalToggle);

  return (
    <div>
      <Button
        className="border-0 btn-success"
        onClick={() => {
          toggle();
        }}
      >
        Create
        <i className="fa-regular fa-square-plus ms-1"></i>{" "}
      </Button>
      <Modal fullscreen='md' isOpen={modalToggle} toggle={toggle}>
        <ModalHeader>Create Assignment</ModalHeader>
        <ModalBody>
          <CreateAssignmentForm></CreateAssignmentForm>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Return to Page
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateAssignmentModal;
