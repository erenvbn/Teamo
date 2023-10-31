import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CreateProjectForm from "../forms/CreateProjectForm";
import EditProjectForm from "../forms/EditProjectForm";

function CreateProjectModal(props) {
  const [modalToggle, setModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedProjectId, setSelectedProject] = useState(1);

  //Function that is changing current modal to its reverse
  const toggle = () => setModal(!modalToggle);

  return (
    <div>
      <Button
        className="btn btn-outline-light"
        onClick={() => {
          toggle();
          setSelectedForm("Create Project");
        }}
      >
        <i className="fa-solid fa-folder-plus"></i>
      </Button>
      <Button
        className="btn btn-outline-light"
        onClick={() => {
          toggle();
          setSelectedForm("Edit Project");
        }}
      >
        <i class="fa-solid fa-gear"></i>
      </Button>

      <Modal isOpen={modalToggle} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>{selectedForm}</ModalHeader>
        <ModalBody>
          {selectedForm === "Create Project" ? (
            <CreateProjectForm />
          ) : selectedForm === "Edit Project" ? (
            <EditProjectForm selectedProjectId={selectedProjectId} />
          ) : null}
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

export default CreateProjectModal;
