// import React from "react";

// function PageContentHeader() {
//   return (
//     <div className="container row">
//       <div className="col">
//         <h1 className="fs-5 text-dark fw-bold"><span>
//             <i class="fa-solid fa-diagram-project me-2"></i>
//             </span>Database Project</h1>
//         <span className="fs-5 text-dark fw-lighter">
//           A project to design and implement a database system
//         </span>
//       </div>
//       <div className="col d-flex justify-content-end align-items-center">
//         <i class="fa-solid fa-circle-user fa-3x me-2"></i>
//         <i class="fa-solid fa-circle-user fa-3x"></i>
//         <i class="fa-solid fa-circle-user fa-3x"></i>
//         <button className="btn btn-primary mx-2">Create</button>
//         <button className="btn btn-primary mx-2">Share</button>
//         <button className="btn btn-secondary mx-2">Filter</button>
//       </div>
//       <div>
//         <hr className="m-3"></hr>
//       </div>
//     </div>
//   );
// }

// export default PageContentHeader;





import React from "react";

function PageContentHeader({
  projectId,
  projectName,
  projectDescription,
}) {
  return (
    <div className="container row">
      <div className="col">
        <h1 className="fs-5 text-dark fw-bold">
          <span>
            <i class="fa-solid fa-diagram-project me-2"></i>
          </span>
          {projectName}
          <span>
            <i class="fa-solid fa-diagram-project me-2"></i>
          </span>
          {projectId}
        </h1>
        <span className="fs-5 text-dark fw-lighter">{projectDescription}</span>
      </div>
      <div className="col d-flex justify-content-end align-items-center">
        <i class="fa-solid fa-circle-user fa-3x me-2"></i>
        <i class="fa-solid fa-circle-user fa-3x"></i>
        <i class="fa-solid fa-circle-user fa-3x"></i>
        <button className="btn btn-primary mx-2">Create</button>
        <button className="btn btn-primary mx-2">Share</button>
        <button className="btn btn-secondary mx-2">Filter</button>
      </div>
      <div>
        <hr className="m-3"></hr>
      </div>
    </div>
  );
}

export default PageContentHeader;
