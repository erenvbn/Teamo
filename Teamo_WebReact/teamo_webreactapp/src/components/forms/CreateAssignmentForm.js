import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { ProjectContext } from "../../store/projectContext";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";

function CreateAssignmentForm() {
  const { selectedProjectId } = useContext(ProjectContext);
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "1",
    status: "1",
    projectId: selectedProjectId,
  });
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [failureAlertVisible, setFailureAlertVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({
      ...assignmentData,
      [name]: value,
    });
    console.log(assignmentData);
  };

  const CreateAssignment = async () => {
    try {
      const res = await apiService.post(
        apiConfig.postAssignment,
        assignmentData
      );
      console.log(res.data);
      console.log("Assignment has been created:", res);
      setSuccessAlertVisible(true);
    } catch (error) {
      console.error("Error while creating an assignment:", error);
      setFailureAlertVisible(true);
    }
  };

  const { selectedProjectData } = useContext(ProjectContext);

  return (
    <div className="flex-row col-12 justify-content-between">
      <div id="panel">
        <Form
          id="createAssignmentForm"
          method="post"
          className="d-grid gap-2 row m-3"
        >
          <FormGroup>
            <Label for="projectName">Project</Label>
            <Input
              type="text"
              className="text-capitalize"
              id="projectName"
              name="projectName"
              value={selectedProjectData.name}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="title">Assignment Title:</Label>
            <Input
              type="text"
              id="assignmentTitle"
              name="title"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="assignmentDescription">Description:</Label>
            <Input
              type="textarea"
              id="assignmentDescription"
              name="description"
              rows="4"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="dueDate">Due Date:</Label>
            <Input
              type="date"
              id="assignmentDueDate"
              name="dueDate"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="priority">Priority</Label>
            <Input
              type="select"
              id="assignmentPriority"
              name="priority"
              onChange={handleChange}
            >
              <option value="1">Unknown</option>
              <option value="2">Low Priority</option>
              <option value="3">Neutral</option>
              <option value="4">High Priority</option>
              <option value="5">Critical</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="select"
              id="assignmentStatus"
              name="status"
              onChange={handleChange}
            >
              <option value="1">Pending</option>
              <option value="2">In Process</option>
              <option value="3">Completed</option>
              <option value="4">Canceled</option>
            </Input>
          </FormGroup>
          <Button onClick={CreateAssignment} className="border-0 btn-success">
            Create Assignment
            <i className="fa-regular fa-calendar-plus ms-2"></i>
          </Button>
          <Alert isOpen={successAlertVisible} color="info">
            The assignment has been created.
          </Alert>
          <Alert isOpen={failureAlertVisible} color="red">
            The assignment has been not been created.
          </Alert>
        </Form>
      </div>
    </div>
  );
}

export default CreateAssignmentForm;
