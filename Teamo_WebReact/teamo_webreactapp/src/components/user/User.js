import React from "react";
import { CardBody, CardFooter, CardTitle } from "react-bootstrap";
import { Toast, ToastHeader, ToastBody, Card } from "reactstrap";

function User({ userId, userName }) {
  return (
    <Card className="p-3 my-2 rounded">
      <CardBody>
        <CardTitle>
          <i class="bi bi-person-circle me-2"></i>
          {userName}-{userId}
        </CardTitle>
      </CardBody>
    </Card>
  );
}

export default User;
