
import NavbarFooter from "../shared/navbar/NavbarFooter";
import NavbarHeader from "../shared/navbar/NavbarHeader";
import About from "./About";

function AboutLayout() {
  return (
    <div>
      <NavbarHeader></NavbarHeader>
      <About></About>
      <NavbarFooter></NavbarFooter>
    </div>
  );
}

export default AboutLayout;
