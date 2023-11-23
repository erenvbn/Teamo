import React, { useEffect } from "react";

function Dashboard() {

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="container mt-5 rounded-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Projects</h5>
                <ul className="list-group" id="ProjectList">
                  {/* Project items will be dynamically added here */}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Assignments</h5>
                <ul className="list-group" id="AssignmentList">
                  {/* Assignment items will be dynamically added here */}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">People</h5>
                <ul className="list-group" id="PeopleList">
                  {/* People items will be dynamically added here */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
