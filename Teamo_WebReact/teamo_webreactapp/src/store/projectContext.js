import React, { createContext, useState } from "react";

// Creating Project Context with an initial project data
export const ProjectContext = createContext({
  selectedProjectId: null,
  selectedProjectData: {},
  setSelectedProjectId: (id) => {},
});

// ProjectContextProvider function component
//to provide context and props to the entire app
export const ProjectContextProvider = ({ children }) => {
  const initialValue = 1
  const [selectedProjectId, setSelectedProjectId] = useState(initialValue);

  // Create a function to update the selected project ID
  const handleSelectedProjectId = (id) => {
    setSelectedProjectId(id);
    console.log("projectContextSelectedProjectID:" + selectedProjectId);
    console.log("projectContexttekiId:" + selectedProjectId);
  };

  return (
    <ProjectContext.Provider
      value={{
        //using state value of selectedProjectId
        selectedProjectId,
        selectedProjectData: {},
        setSelectedProjectId: handleSelectedProjectId,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
