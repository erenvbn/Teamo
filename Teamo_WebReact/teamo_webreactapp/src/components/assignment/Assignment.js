import React, { useState, useEffect } from "react";
import { Progress, Button } from "reactstrap";

function Assignment({ title, description, dueDate, priority, status }) {
  const [remainingDays, setRemainingDays] = useState(0);

  useEffect(() => {
    calculateRemainingDays(dueDate);
  }, [dueDate]);

  const calculateRemainingDays = (dueDate) => {
    dueDate = new Date(dueDate);
    const timeDifference = dueDate - new Date();
    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    setRemainingDays(remainingDays);
    console.log(remainingDays);
  };

  return (
    <div className="card mb-3">
      <div className="d-flex flex-row justify-content-between m-2">
        <div className="card-body">
          <h5 className="card-title text-capitalize">{title}</h5>
          <h5 className="card-text">{description}</h5>
          <h5 className="card-text">Due Date: {dueDate}</h5>
          <h5 className="card-text">Priority: {priority}</h5>
          <h5 className="card-text">
            Status: {status === 0 ? "Not Started" : "In Progress"}
          </h5>
        </div>
        <div className="d-flex flex-column justify-content-center gap-1">
          <i className="fa-regular fa-circle-user "></i>
          <i className="fa-regular fa-circle-user "></i>
          <i className="fa-regular fa-circle-user "></i>
        </div>
      </div>
      <div className="container d-flex flex-row justify-content-between">
        <Progress
          min={0}
          max={100}
          color="success" /* Change to "success" for green color */
          className="my-1 ms-4 w-50 bg-black"
          value={remainingDays}
        >
          {remainingDays} days remaining
        </Progress>
        <div className="btn-group me-2 mb-2">
          <Button small className="border-0 btn-info btn-sm">
            <i class="fa-solid fa-ellipsis"></i>{" "}
          </Button>
          <Button className="border-0 btn-danger btn-sm">
            <i class="fa-solid fa-xmark"></i>{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Assignment;
