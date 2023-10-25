import React from "react";
import { createContext } from "react";


//Creating Project Context and selectedProjectId object
//with an initial id of 1 
export const ProjectContext = createContext({selectedProjectId:1});