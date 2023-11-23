import NavbarHeaderLogin from "../shared/navbar/NavbarHeaderLogin.js";
import NavbarFooter from "../shared/navbar/NavbarFooter";
import Home from "./Home";

function HomeLayout() {
  return (
    <div>
      <NavbarHeaderLogin></NavbarHeaderLogin>
      <Home></Home>
      <NavbarFooter></NavbarFooter>
    </div>
  );
}

export default HomeLayout;
