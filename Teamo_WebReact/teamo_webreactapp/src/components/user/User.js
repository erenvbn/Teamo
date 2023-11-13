import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./user.css"; // Import your custom styles

function User({ userId, userName }) {
  return (
    <div className="container d-flex justify-content-center">
      <Card className="user-card p-3 py-4">
        <div className="text-center">
          <button className="btn btn-secondary rounded-circle border-0">
            <img
              src="https://i.imgur.com/wvxPV9S.png"
              width="100"
              className="rounded-circle"
              alt="User Avatar"
            />
          </button>
          <h3 className="mt-4">{userName}</h3>
          <span className="user-role">Data Analyst Lead</span>

          <div className="row mt-4 mb-3">
            <div className="col-md-4">
              <h5>Finished</h5>
              <span className="num">10</span>
            </div>
            <div className="col-md-4">
              <h5>Current Tasks</h5>
              <span className="num">3</span>
            </div>
            <div className="col-md-4">
              <h5>To Go</h5>
              <span className="num">2</span>
            </div>
          </div>

          <hr className="user-line" />

          <small className="user-description mt-4">
            {userName} is a data analyst lead in TeamO.
          </small>

          <div className="profile mt-4">
            <button className="btn profile-button px-5">Check Profile</button>
            <button className="btn profile-button px-5">Chat</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default User;
