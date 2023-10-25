import React from "react";

function CreateProjectForm() {
  return (
    // <!-- Create Assignment Form  -->
    <div className="flex-row col-12 justify-content-between">
      <div id="panel">
        <form
          id="createAssignmentForm"
          method="post"
          className="d-grid gap-2 row m-3 col-6"
        >
          {/* <!-- Adjusted column size --> */}
          <div>
            <label htmlFor="assignmentProjectId">Project:</label>
            <select
              className="form-control"
              id="assignmentProjectIdInput"
              name="assignmentProjectId"
            >
              {/* <!-- Options htmlFor ProjectList --> */}
            </select>
          </div>
          <div>
            <label htmlFor="assignmentTitle">Assignment Title:</label>
            <input
              type="text"
              className="form-control"
              id="assignmentTitleInput"
              name="assignmentTitle"
            />
          </div>
          <div>
            <label htmlFor="assignmentDescription">Description:</label>
            <textarea
              className="form-control"
              id="assignmentDescriptionInput"
              name="assignmentDescription"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label htmlFor="assignmentDueDate">Due Date:</label>
            <input
              type="date"
              className="form-control"
              id="assignmentDueDateInput"
              name="assignmentDueDate"
            />
          </div>
          <div>
            <label htmlFor="assignmentPriority">Priority</label>
            <select
              className="form-control"
              id="assignmentPriorityInput"
              name="assignmentPriority"
            >
              <option>Unknown</option>
              <option>Low Priority</option>
              <option>Neutral</option>
              <option>High Priority</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <label htmlFor="assignmentStatus">Status</label>
            <select
              className="form-control"
              id="assignmentStatusInput"
              name="assignmentStatus"
            >
              <option>Pending</option>
              <option>In Process</option>
              <option>Completed</option>
              <option>Canceled</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-secondary border-0 bg-feedback-success text-black mt-2"
            onclick=""
          >
            Create Assignment
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectForm;
