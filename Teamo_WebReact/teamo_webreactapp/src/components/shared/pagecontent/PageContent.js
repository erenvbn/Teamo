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
import CreateAssignmentModal from "../../modal/CreateAssignmentModal";

function PageContent() {
  // Project Properties
  const [projectId, setProjectId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [assignments, setAssignments] = useState([]);
  // Change Selected Tabs
  const [selectedProjectTab, setSelectedProjectTab] = useState("Summary");
  const onTabClick = (tabText) => {
    setSelectedProjectTab(tabText);
  };
  // Use local state to store selectedProjectId
  const { selectedProjectId, selectedProjectData } = useContext(ProjectContext);

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
        <div className="container">
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
            <div>{<ProjectSummary></ProjectSummary>}</div>
          )}
          {selectedProjectTab === "Assignments" && (
            <div>
              <div className="d-flex flex-row justify-content-end gap-1">
                <div className="d-flex btn-group mb-2 justify-content-evenly ">
                  <CreateAssignmentModal></CreateAssignmentModal>
                </div>
              </div>
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
            <div>{<ProjectPeople></ProjectPeople>}</div>
          )}
          {selectedProjectTab === "Board" && (
            <div>{<ProjectBoard></ProjectBoard>}</div>
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
