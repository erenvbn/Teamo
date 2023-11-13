import React, { useEffect, useState, useContext } from "react";
import User from "../user/User";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";
import { ProjectContext } from "../../store/projectContext";

function ProjectUser() {
  const { selectedProjectId, selectedProjectData } = useContext(ProjectContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiService
      .get(apiConfig.getProjectUser + `/${selectedProjectId}`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment data: ", error);
      });
  }, [selectedProjectId]);

  return (
    <div className="card mb-3">
      <div className="d-flex flex-row justify-content-between m-2">
        <div className="card-body">
          <h5 className="card-title text-capitalize">
            Assignees in this project
          </h5>
          <div className="d-flex flex-wrap gap-2">
            {users.map((user) => {
              return (
                <User
                  key={user.id}
                  userId={user.id}
                  userName={user.name}
                ></User>
              );
            })}
          </div>
        </div>
      </div>


    </div>
  );
}

export default ProjectUser;
