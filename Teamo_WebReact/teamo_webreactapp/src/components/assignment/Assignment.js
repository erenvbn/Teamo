function Assignment({ title, description, dueDate, priority, status }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h5 className="card-text">{description}</h5>
        <h5 className="card-text">Due Date: {dueDate}</h5>
        <h5 className="card-text">Priority: {priority}</h5>
        <h5 className="card-text">
          Status: {status === 0 ? "Not Started" : "In Progress"}
        </h5>
      </div>
    </div>
  );
}

export default Assignment;
