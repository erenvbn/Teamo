function Assignment({ title, description, dueDate, priority, status }) {
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
    </div>
  );
}

export default Assignment;
