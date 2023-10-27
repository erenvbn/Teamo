import React, { useState } from 'react';
import Sidebar from "../sidebar/Sidebar";
import PageContent from "../pagecontent/PageContent";
import PageContentAssignment from "../pagecontent/PageContentAssignment";

function MainProjectLayout(props) {
  const [selectedProjectId, setSelectedProject] = useState(1);

  const handleSelectedProject = (projectId) => {
    setSelectedProject(projectId);
    console.log(projectId);
  }

  return (
    <div className="row rounded-2">
      <div className="col-2">
        <Sidebar onProjectClick={handleSelectedProject} />
      </div>
      <div className="m-2 col-9">
        <PageContent selectedProjectId={selectedProjectId} />
      </div>
    </div>
  );
}

export default MainProjectLayout;
