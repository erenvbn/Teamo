// import { useEffect, useState } from "react";
// import apiService from "../../../services/apiService";
// import apiConfig from "../../../config/apiconfig";
// import ButtonSubmit from "../../button/ButtonSubmit";
// import ButtonAddProject from "../../button/ButtonAdd";
// import CreateProjectModal from "../../modal/CreateProjectModal";
// const Sidebar = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     apiService
//       .get(apiConfig.getProjects)
//       .then((res) => {
//         const resProjects = res.data;
//         setProjects(resProjects);
//       })
//       .catch((error) => {
//         console.log("Error Message:", error);
//       });
//   }, []);

//   return (
//     <div className="d-flex flex-column d-block text-black border-1 border-end mt-1 ms-1 me-1 p-2">
//       <div className="d-flex flex-column align-items-center mt-3">
//         <h1 className="fs-5 text-dark fw-bold">Projects</h1>
//         <CreateProjectModal></CreateProjectModal>
//       </div>
//       <ul className="list-group mt-4">
//         {projects.map((project) => (
//           <ButtonSubmit
//             key={project.id}
//             buttonid={project.id}
//             text={project.name}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;




import { useEffect, useState } from "react";
import apiService from "../../../services/apiService";
import apiConfig from "../../../config/apiconfig";
import ButtonSubmit from "../../button/ButtonSubmit";
import ButtonAddProject from "../../button/ButtonAdd";
import CreateProjectModal from "../../modal/CreateProjectModal";
const Sidebar = ({ onProjectClick }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    apiService
      .get(apiConfig.getProjects)
      .then((res) => {
        const resProjects = res.data;
        setProjects(resProjects);
      })
      .catch((error) => {
        console.log("Error Message:", error);
      });
  }, []);

  return (
    <div className="d-flex flex-column d-block text-black border-1 border-end mt-1 ms-1 me-1 p-2">
      <div className="d-flex flex-column align-items-center mt-3">
        <h1 className="fs-5 text-dark fw-bold">Projects</h1>
        <CreateProjectModal></CreateProjectModal>
      </div>
      <ul className="list-group mt-4">
        {projects.map((project) => (
          <ButtonSubmit
            key={project.id}
            buttonid={project.id}
            text={project.name}
            onClickPass={onProjectClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
