import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "react-bootstrap";

function ProjectComment({
  selectedProjectId,
  commentText,
  userName,
  commentDate,
  commentDateHour,
  assignmentId,
}) {
  return (
    <Card className="mb-2 p-0 m-0">
      <CardHeader>
        <div className="d-flex flex-row justify-content-between">
          <h5 className="m-0">{userName}</h5>
          <h5 className="m-0">commented on task: {assignmentId}</h5>
        </div>
      </CardHeader>
      <CardBody>
        <h5 className="m-0 text-black">{commentText}</h5>
      </CardBody>
      <CardFooter>
        <div className="d-flex flex-row justify-content-between">
          <h5 className="m-0">{commentDateHour}</h5>
          <h5 className="m-0">{commentDate}</h5>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProjectComment;
