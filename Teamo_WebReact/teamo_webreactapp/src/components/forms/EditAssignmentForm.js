import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";
import axios from "axios";
import { Button, Alert, FormGroup, Label, Input } from "reactstrap";

const EditAssignmentForm = ({ editedAssignmentId }) => {
  const [assignmentData, setAssignmentData] = useState({});

  const [isSuccessAlertVisible, setSuccessAlertVisible] = useState(false);
  const [isFailureAlertVisible, setFailureAlertVisible] = useState(false);

  useEffect(() => {
    console.log("Seçili AID =", editedAssignmentId);
    console.log(apiConfig.getAssignments + `/${editedAssignmentId}`);

    apiService
      .get(apiConfig.getAssignments + `/${editedAssignmentId}`)
      .then((res) => {
        // Format the date here
        const formattedAssignmentData = {
          ...res.data,
          dueDate: formatDate(res.data.dueDate),
        };
        setAssignmentData(formattedAssignmentData);
        console.log("Gelen DataDueDate:" + `${res.data.dueDate}`);
        console.log("Gelen DataPriority:" + `${res.data.priority}`);
        console.log("Gelen DataStatus:" + `${res.data.status}`);
      })
      .catch((error) => {
        console.error("Error fetching assignment data: ", error);
      });
  }, [editedAssignmentId]);

  const handleEditAssignment = (e) => {
    const { name, value } = e.target;
    setAssignmentData({ ...assignmentData, [name]: value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const EditAssignment = async () => {
    try {
      // Format the date here
      const formattedAssignmentData = {
        ...assignmentData,
        dueDate: formatDate(assignmentData.dueDate),
      };
      console.log("FATitle:"+ formattedAssignmentData.title);
      console.log("FAPriority:"+ formattedAssignmentData.priority);
      console.log("FAStatus:"+ formattedAssignmentData.status);

      const res = await apiService.put(
        apiConfig.updateAssignment + `/${editedAssignmentId}`,
        formattedAssignmentData
      );

      console.log("Assignment has been edited:", res);
      setSuccessAlertVisible(true);
    } catch (error) {
      console.error("Error while editing an assignment:", error);
      setFailureAlertVisible(true);
    }
  };

  return (
    <div className="flex-row col-12">
      <div id="panel">
        <form
          id="editAssignmentForm"
          method="post"
          className="d-grid gap-2 row m-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="projectName">Assignment Title:</label>
            <input
              type="text"
              className="form-control"
              id="assignmentTitle"
              name="title"
              value={assignmentData.title || ""}
              onChange={handleEditAssignment}
            />
          </div>
          <div>
            <label htmlFor="projectDescription">Description:</label>
            <textarea
              className="form-control"
              id="assignmentDescriptionInput"
              name="description"
              value={assignmentData.description || ""}
              rows="4"
              onChange={handleEditAssignment}
            ></textarea>
          </div>
          <div>
            <label htmlFor="assignmentDueDate">Due Date:</label>
            <input
              type="date"
              className="form-control"
              id="assignmentDueDateInput"
              name="dueDate"
              value={assignmentData.dueDate || ""}
              onChange={handleEditAssignment}
            />
          </div>
          <FormGroup>
            <Label for="priority">Priority</Label>
            <Input
              type="select"
              id="assignmentPriority"
              name="priority"
              value={assignmentData.priority || "1"}
              onChange={handleEditAssignment}
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
              value={assignmentData.status || "1"}
              onChange={handleEditAssignment}
            >
              <option value="1">Pending</option>
              <option value="2">In Process</option>
              <option value="3">Completed</option>
              <option value="4">Canceled</option>
            </Input>
          </FormGroup>
          <Alert isOpen={isSuccessAlertVisible} color="info">
            The assignment has been edited successfully
          </Alert>
          <Alert isOpen={isFailureAlertVisible} color="danger">
            The assignment has not been edited
          </Alert>
          <Button onClick={EditAssignment}>Edit Assignment</Button>
        </form>
      </div>
    </div>
  );
};

export default EditAssignmentForm;
