import React, { useEffect, useState, useContext } from "react";
import apiService from "../../../services/apiService";
import apiConfig from "../../../config/apiconfig";
import PageContentHeader from "./PageContentHeader";
import Assignment from "../../assignment/Assignment";
import { ProjectContext } from "../../../store/projectContext";
import { Button } from "reactstrap";
import ProjectSummary from "../../project/ProjectSummary";
import ProjectPeople from "../../project/ProjectPeople";
import ProjectBoard from "../../project/ProjectBoard";

function PageContent() {
  // Project Properties
  const [projectId, setProjectId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [assignments, setAssignments] = useState([]);

  // Change Selected Tabs
  const [selectedProjectTab, setSelectedProjectTab] = useState("Assignment");

  const onTabClick = (tabText) => {
    setSelectedProjectTab(tabText);
  };

  // Use local state to store selectedProjectId
  const { selectedProjectId } = useContext(ProjectContext);

  // Fetch project data based on the selectedProjectId
  useEffect(() => {
    if (selectedProjectId !== null) {
      apiService
        .get(apiConfig.getProjects + `/${selectedProjectId}`)
        .then((res) => {
          const selectedProject = res.data;
          setProjectId(selectedProject.id);
          setProjectName(selectedProject.name);
          setProjectDescription(selectedProject.description);
          console.log("PageContent:" + selectedProjectId);
        })
        .catch((error) => {
          console.error("Error fetching project data: ", error);
        });
    }
  }, [selectedProjectId]);

  // Fetch Assignment of the Selected Project
  useEffect(() => {
    if (selectedProjectId !== null) {
      // Fetch assignments based on the selected project's ID
      apiService
        .get(apiConfig.getAssignments)
        .then((res) => {
          const filteredAssignments = res.data.filter(
            (assignment) => assignment.projectId === selectedProjectId
          );
          setAssignments(filteredAssignments);
        })
        .catch((error) => {
          console.error("Error fetching assignment data: ", error);
        });
    }
  }, [selectedProjectId]);

  return (
    <div>
      {selectedProjectId ? (
        <div>
          <PageContentHeader
            projectId={projectId}
            projectName={projectName}
            projectDescription={projectDescription}
          />
          <hr className="mt-3 mb-2 " />
          <div
            className="mt-2 mb-2 col-md-12 d-flex 
          justify-content-between btn-group shadow-sm "
          >
            <Button
              className="btn btn-outline-light bg-gray"
              onClick={() => {
                onTabClick("Summary");
              }}
            >
              Summary
            </Button>
            <Button
              className="btn btn-outline-light bg-gray"
              onClick={() => {
                onTabClick("Assignments");
              }}
            >
              Assignments
            </Button>
            <Button
              className="btn btn-outline-light bg-gray"
              onClick={() => {
                onTabClick("Board");
              }}
            >
              Board
            </Button>
            <Button
              className="btn btn-outline-light bg-gray"
              onClick={() => {
                onTabClick("People");
              }}
            >
              People
            </Button>
          </div>
          {selectedProjectTab === "Summary" && (
            <div className="container">{<ProjectSummary></ProjectSummary>}</div>
          )}
          {selectedProjectTab === "Assignments" && (
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
            <div className="container">{<ProjectPeople></ProjectPeople>}</div>
          )}
          {selectedProjectTab === "Board" && (
            <div className="container">{<ProjectBoard></ProjectBoard>}</div>
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
