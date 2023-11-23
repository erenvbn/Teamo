import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";

function AddAssignmentComment({ commentAssignmentId, userName }) {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Here, you can add logic to submit the comment to the database
    // For simplicity, let's just log the comment text for now
    console.log(commentText);
    // You can add your database submission logic here
    // For example, make an API call to store the comment in the database
  };

  return (
    <Card className="mb-2 p-0 m-0">
      <CardHeader>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row justify-content-between">
            <h5 className="m-0">User commenting on</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <h5 className="m-0 text-black">{commentText}</h5>
        <Form onSubmit={handleCommentSubmit}>
          <FormControl
            as="textarea"
            rows={3}
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="d-flex flex-row justify-content-end">
            <Button type="submit" variant="primary" className="mt-2">
              <i class="fa-regular fa-paper-plane fs-5"></i>
            </Button>
          </div>
        </Form>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default AddAssignmentComment;
