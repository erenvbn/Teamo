import React, { useContext, useState } from "react";
import { ProjectContext } from "../../store/projectContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import RecentActivity from "./RecentActivity";

function ProjectSummary({}) {
  const [] = useState(4);
  const selectedProjectId = useContext(ProjectContext).selectedProjectId;

  return (
    <div>
      <div className="card mb-3 shadow-sm">
        <div className="d-flex flex-row justify-content-between m-2">
          <div className="card-body">
            <h4 className=" text-body-emphasis text-capitalize text-center">
              🌤️ Good Morning, Eren
            </h4>
            <h5 className="text-capitalize text-center">
              Here's where you can view a summary of your projects and more.
            </h5>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-around card-group gap-3 p-2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle tag="h5">Status Overview</CardTitle>
                <CardText>
                  View the progress of your project according to assignments'
                  status.
                </CardText>
                <CardBody></CardBody>
              </Card>
            </Col>
            <Col sm="6">
              <Card body className=" shadow-sm border-light">
                <CardTitle tag="h5">Recent Activity</CardTitle>
                <CardText></CardText>
                <RecentActivity></RecentActivity>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ProjectSummary;
