import { useEffect, useState } from "react";
import apiService from "../../../services/apiService";
import apiConfig from "../../../config/apiconfig";
import PageContentHeader from "./PageContentHeader";
import Assignment from "../../assignment/Assignment";

function PageContent({ selectedProjectId }) {
  const [projectId, setProjectId] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    apiService
      .get(apiConfig.getProjects + `/${selectedProjectId}`)
      .then((res) => {
        const selectedProject = res.data;
        setProjectId(selectedProject.id);
        setProjectName(selectedProject.name);
        setProjectDescription(selectedProject.description);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [selectedProjectId]);

  useEffect(() => {
    apiService
      .get(apiConfig.getAssignments)
      .then((res) => {
        const filteredAssignments = res.data.filter(
          (assignment) => assignment.projectId === projectId
        );
        setAssignments(filteredAssignments);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [projectId]);

  return (
    <div>
      <PageContentHeader
        projectId={projectId}
        projectName={projectName}
        projectDescription={projectDescription}
      />
      <div className="container border border-1">
        <div>
          {assignments.map((assignment) => (
            <Assignment
              key={assignment.id}
              title={assignment.title}
              description={assignment.description}
              dueDate={assignment.dueDate}
              priority={assignment.priority}
              status={assignment.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageContent;
