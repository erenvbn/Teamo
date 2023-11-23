import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./components/public/css/bootstrap.css";
import "./components/public/css/style.css";
import { createRoot } from "react-dom/client";
import reactstrap from "reactstrap";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import HomeLayout from "./components/index/HomeLayout";
import AboutLayout from "./components/about/AboutLayout";
import ContactLayout from "./components/contact/ContactLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import ProjectLayout from "./components/project/ProjectLayout";
import { ProjectContext, ProjectContextProvider } from "./store/projectContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <HomeLayout></HomeLayout>
      </div>
    ),
  },
  {
    path: "/index",
    element: (
      <div>
        <HomeLayout></HomeLayout>
      </div>
    ),
  },
  {
    path: "/about",
    element: <AboutLayout></AboutLayout>,
  },
  {
    path: "/contact",
    element: <ContactLayout></ContactLayout>,
  },
  {
    path: "/dashboardlayout",
    element: <DashboardLayout></DashboardLayout>,
  },
  {
    path: "/projectlayout",
    element: (
      //Wrapping ProjectLayout root with ProjectContext.Provider
      //To share the values in ProjectContext
      <ProjectContextProvider>
        <div>
          <ProjectLayout />
        </div>
      </ProjectContextProvider>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
