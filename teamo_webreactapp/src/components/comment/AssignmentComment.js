import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "react-bootstrap";

function AssignmentComment({
  commentId,
  commentAssignmentId,
  commentText,
  userName,
  commentDate,
  commentDateHour,
}) {
  return (
    <Card className="mb-2 p-0 m-0">
      <CardHeader>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row justify-content-between">
            <h5 className="m-0">{userName}</h5>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <h5 className="m-0 me-2">{commentDateHour}</h5>
            <h5 className="m-0">{commentDate}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <h5 className="m-0 text-black">{commentText}</h5>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default AssignmentComment;
