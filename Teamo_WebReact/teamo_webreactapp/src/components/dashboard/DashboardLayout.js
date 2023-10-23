import NavbarFooter from "../shared/navbar/NavbarFooter";
import NavbarHeader from "../shared/navbar/NavbarHeader";
import Dashboard from "./Dashboard";

function DashboardLayout() {
  return (
    <div>
      <NavbarHeader></NavbarHeader>
      <Dashboard></Dashboard>
      <NavbarFooter></NavbarFooter>
    </div>
  );
}

export default DashboardLayout;
