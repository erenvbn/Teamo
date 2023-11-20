import React, { createContext, useEffect, useState } from "react";
import apiConfig from "../config/apiconfig";
import apiService from "../services/apiService";

// Define a context with default values
export const ProjectContext = createContext({
  selectedProjectId: null,
  selectedProjectData: {},
  setSelectedProjectId: (id) => {},
  refreshAssignmentUsersFlag:false,
  setRefreshAssignmentUsersFlag: () => {},
});

// Component to provide the project context to the app
export const ProjectContextProvider = ({ children }) => {
  // Initial value for selected project ID
  const initialValue = 1;

  // State variables for project-related data
  const [selectedProjectIdState, setSelectedProjectIdSetter] =
    useState(initialValue);
  const [selectedProjectDataState, setSelectedProjectDataSetter] = useState({});
  const [refreshAssignmentUsersFlagState, setRefreshAssignmentUsersFlagSetter] =
    useState(false);

  // Log the value of refreshAssignmentUsersFlag whenever it changes
  // useEffect(() => {
  //   console.log(
  //     "refreshAssignmentUsersFlag changed:",
  //     refreshAssignmentUsersFlagState
  //   );
  // }, [refreshAssignmentUsersFlagState]);

  // Fetch project data based on the selectedProjectId
  useEffect(() => {
    if (selectedProjectIdState !== null) {
      apiService
        .get(apiConfig.getProjects + `/${selectedProjectIdState}`)
        .then((res) => {
          setSelectedProjectDataSetter(res.data);
        })
        .catch((error) => {
          console.error("Error fetching project data: ", error);
        });
    }
  }, [selectedProjectIdState, refreshAssignmentUsersFlagState]);

  // Function to update the selected project ID
  const handleSelectedProjectId = (id) => {
    setSelectedProjectIdSetter(id);
    // Additional logic if needed
  };

  // Function to toggle the refreshAssignmentUsersFlag
  const handleAssignmentUserRefresh = () => {
    setRefreshAssignmentUsersFlagSetter(!refreshAssignmentUsersFlagState);
  };

  return (
    // Provide actual values and functions through the context
    //as a key value pairs
    <ProjectContext.Provider
      value={{
        // selectedProjectId: This property holds the current selected project ID.
        selectedProjectId: selectedProjectIdState,

        selectedProjectData: selectedProjectDataState,
        setSelectedProjectId: handleSelectedProjectId,

        //Bu değişimden yararlanmasını istediği componente koy (useeffect)
        refreshAssignmentUsersFlag: refreshAssignmentUsersFlagState,

        //Aşağıdakini bu fonksiyon aracılığıyla state'i update etmek 
        //isteyen componente koy
        setRefreshAssignmentUsersFlag: handleAssignmentUserRefresh,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
