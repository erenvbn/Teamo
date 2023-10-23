import { useEffect, useState } from "react";
import apiService from "../../../services/apiService";
import apiConfig from "../../../config/apiconfig";
import ButtonSubmit from "../../button/ButtonSubmit";

const Sidebar = ({ onProjectClick }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    apiService
      .get(apiConfig.getProjects)
      .then((res) => {
        const resProjects = res.data;
        setProjects(resProjects);
        console.log(resProjects);
      })
      .catch((error) => {
        console.log("Error Message:", error);
      });
  }, []);

  return (
    <div className="d-flex flex-column col-12 p-1 text-black border border-1">
      <span className="fs-5 text-dark fw-bold">Projects</span>
      <ul className="list-group">
        {projects.map((project) => (
          <ButtonSubmit
            key={project.id}
            buttonid={project.id}
            text={project.name}
            onClick={onProjectClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
