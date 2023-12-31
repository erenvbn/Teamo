import React from "react";
import CalendarTimeline from "../board/CalendarTimeline";

function ProjectBoard() {
  return (
    <div className="card mb-3">
      <div className="d-flex flex-row justify-content-between m-2">
        <div className="card-body">
          <h5 className="card-title text-capitalize">Board</h5>
          <h5 className="card-title text-capitalize">Add React Big Calendar</h5>
          <div className="col-6">
            <CalendarTimeline></CalendarTimeline>
          </div>
          <div className="container"></div>
        </div>
      </div>
    </div>
  );
}

export default ProjectBoard;
