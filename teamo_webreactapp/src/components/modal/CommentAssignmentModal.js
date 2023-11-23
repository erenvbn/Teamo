import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Assignment from "../assignment/Assignment";

const CommentAssignmentModal = ({ sharedKey, isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl">
      <ModalHeader toggle={toggle}>Assignment Details</ModalHeader>
      <ModalBody>
        <div></div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CommentAssignmentModal;
