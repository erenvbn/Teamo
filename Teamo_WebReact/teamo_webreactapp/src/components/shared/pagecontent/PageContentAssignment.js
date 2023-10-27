import React, { useEffect, useState, useContext } from "react";
import apiService from "../../../services/apiService";
import apiConfig from "../../../config/apiconfig";
import PageContentHeader from "./PageContentHeader";
import Assignment from "../../assignment/Assignment";
import { ProjectContext } from "../../../store/projectContext";

function PageContent() {
  // Project Properties
  const [projectId, setProjectId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [assignments, setAssignments] = useState([]);

  const [selectedProjectTab, setSelectedProjectTab] = useState("Assignment");

  // Consuming ProjectContext
  const selectedProjectId = useContext(ProjectContext).selectedProjectId;

  useEffect(() => {
    // Fetch project data based on the selectedProjectId
    if (selectedProjectId !== null) {
      apiService
        .get(apiConfig.getProjects + `/${selectedProjectId}`)
        .then((res) => {
          const selectedProject = res.data;
          setProjectId(selectedProject.id);
          setProjectName(selectedProject.name);
          setProjectDescription(selectedProject.description);
          console.log(selectedProjectTab);
        })
        .catch((error) => {
          console.error("Error fetching project data: ", error);
        });
    }
  }, [selectedProjectId]);

  useEffect(() => {
    if (projectId !== null) {
      // Fetch assignments based on the selected project's ID
      apiService
        .get(apiConfig.getAssignments)
        .then((res) => {
          const filteredAssignments = res.data.filter(
            (assignment) => assignment.projectId === projectId
          );
          setAssignments(filteredAssignments);
        })
        .catch((error) => {
          console.error("Error fetching assignment data: ", error);
        });
    }
  }, [projectId]);

  return (
    <div>
      {selectedProjectId ? (
        <div>
          <PageContentHeader
            projectId={projectId}
            projectName={projectName}
            projectDescription={projectDescription}
          />
          {selectedProjectTab === "Assignment" && (
            <div className="container">
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
          )}
          {selectedProjectTab === "People" && (
            <div className="container">
              {/* Render content for "People" tab */}
            </div>
          )}
          {selectedProjectTab === "Board" && (
            <div className="container">
              {/* Render content for "Board" tab */}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Select a Project!</h1>
        </div>
      )}
    </div>
  );
}

export default PageContent;
