import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
  Button,
} from "reactstrap";

function CreateProjectFormMain() {
  return (
    <div>
      <Form>
        <FormGroup row>
          <Label htmlFor="exampleSelect" sm={2}>
            Project Name
          </Label>
          <Col sm={10}>
            <Input id="exampleSelect" name="select" type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label htmlFor="assignmentName" sm={2}>
            Assignment Name
          </Label>
          <Col sm={10}>
            <Input id="assignmentName" name="assignmentName" type="text" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label htmlFor="statusSelect" sm={2}>
            Priority
          </Label>
          <Col sm={10}>
            <Input id="statusSelect" name="statusSelect" type="select">
              <option>Pending</option>
              <option>In Process</option>
              <option>Completed</option>
              <option>Canceled</option>
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label htmlFor="prioritySelect" sm={2}>
            Status
          </Label>
          <Col sm={10}>
            <Input id="prioritySelect" name="prioritySelect" type="select">
              <option>Unknown</option>
              <option>Low Priority</option>
              <option>Neutral</option>
              <option>High Priority</option>
              <option>Critical</option>
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label htmlFor="exampleText" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input id="exampleText" name="text" type="textarea" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label htmlFor="dueDate" sm={2}>
            Due Date
          </Label>
          <Col sm={10}>
            <Input
              id="dueDate"
              name="dueDate"
              placeholder="date placeholder"
              type="date"
            />
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          >
            <Button>Create Assignment</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default CreateProjectFormMain;
