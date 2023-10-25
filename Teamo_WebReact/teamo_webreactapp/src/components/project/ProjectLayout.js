import NavbarHeaderLogin from "../shared/navbar/NavbarHeaderLogin.js";
import NavbarFooter from "../shared/navbar/NavbarFooter";
import MainProjectLayout from "../shared/layout/MainProjectLayout.js";
import Sidebar from "../shared/sidebar/Sidebar";

function ProjectLayout() {
  return (
    <div>
      <NavbarHeaderLogin />
      <MainProjectLayout />
      <NavbarFooter />
    </div>
  );
}

export default ProjectLayout;
