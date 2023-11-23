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
          <Label for="projectName" sm={2}>
            Project Name
          </Label>
          <Col sm={10}>
            <Input id="projectName" name="projectName" type="text" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            Select
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
          <Label for="startDate" sm={2}>
            Start Date
          </Label>
          <Col sm={10}>
            <Input
              id="startDate"
              name="startDate"
              placeholder="date placeholder"
              type="date"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="startDate" sm={2}>
            Start Date
          </Label>
          <Col sm={10}>
            <Input
              id="endDate"
              name="endDate"
              placeholder="date placeholder"
              type="date"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input id="exampleText" name="text" type="textarea" />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          >
            <Button>Create Project</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default CreateProjectFormMain;
