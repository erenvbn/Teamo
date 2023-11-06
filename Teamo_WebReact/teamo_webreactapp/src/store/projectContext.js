import React, { createContext, useEffect, useState } from "react";
import apiConfig from "../config/apiconfig";
import apiService from "../services/apiService";

// Creating Project Context with an initial project data
export const ProjectContext = createContext({
  selectedProjectId: null,
  selectedProjectData: {},
  setSelectedProjectId: (id) => {},
});

// ProjectContextProvider function component
//to provide context and props to the entire app
export const ProjectContextProvider = ({ children }) => {
  const initialValue = 1;
  const [selectedProjectId, setSelectedProjectId] = useState(initialValue);
  const [selectedProjectData, setSelectedProjectData] = useState({});

  // Fetch project data based on the selectedProjectId
  useEffect(() => {
    if (selectedProjectId !== null) {
      apiService
        .get(apiConfig.getProjects + `/${selectedProjectId}`)
        .then((res) => {
          setSelectedProjectData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching project data: ", error);
        });
    }
  }, [selectedProjectId]);

  // Create a function to update the selected project ID
  const handleSelectedProjectId = (id) => {
    setSelectedProjectId(id);
  };

  return (
    //INITIAL VALUES HERE IMPORTANT
    <ProjectContext.Provider
      value={{
        //using state value of selectedProjectId
        selectedProjectId,
        selectedProjectData,
        setSelectedProjectId: handleSelectedProjectId,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};