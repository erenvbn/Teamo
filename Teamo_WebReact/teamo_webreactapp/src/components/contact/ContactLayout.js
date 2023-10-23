import NavbarFooter from "../shared/navbar/NavbarFooter";
import NavbarHeader from "../shared/navbar/NavbarHeader";
import Contact from "./Contact";

function ContactLayout() {
  return (
    <div>
      <NavbarHeader></NavbarHeader>
      <Contact></Contact>
      <NavbarFooter></NavbarFooter>
    </div>
  );
}

export default ContactLayout;
