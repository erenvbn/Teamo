//CLASSES
class Assignment {
  constructor(
    id,
    title,
    description,
    dueDate,
    priority,
    status,
    projectId,
    userIds = [], // Default to an empty array if userIds is not provided
    userNames = [] // Default to an empty array if userIds is not provided
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.status = status;
    this.projectId = projectId;
    this.userIds = userIds; // Assign the provided userIds or an empty array by default
    this.userNames = userNames; // Assign the provided userIds or an empty array by default
  }
}

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    // If you need CommentIds and AssignmentIds as arrays, you can add them here.
    // this.commentIds = [];
    // this.assignmentIds = [];
  }
}

class AssignmentUser {
  constructor(id, assignmentId, userId) {
    this.id = id; // Optional, you can include it if needed
    this.assignmentId = assignmentId;
    this.userId = userId;
    // If you want Assignment and User as navigation properties, you can include them here.
    // this.assignment = null;
    // this.user = null;
  }
}

class Project {
  constructor(id, name, description, startDate, endDate) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    // If you need AssignmentIds as an array, you can add it here.
    // this.assignmentIds = [];
  }
}

class Comment {
  constructor(id, text, createdAt, assignmentId, userId) {
    this.id = id;
    this.text = text;
    this.createdAt = new Date(createdAt);
    this.assignmentId = assignmentId;
    this.userId = userId;
  }
}

//CONSTRAINTS
const root = "https://localhost:7001/api";
const currentDate = new Date();

//SHOW ENTITY LIST
function ShowEntityList(list, propertyName, targetElementId) {
  const entityList = document.getElementById(targetElementId);
  for (let i = 0; i < list.length; i++) {
    const liElement = document.createElement("li");
    liElement.classList.add(
      "list-group-item",
      "list-group-item-secondary",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    // Use the propertyName parameter to access the correct property
    liElement.innerText = list[i][propertyName];
    entityList.appendChild(liElement);
  }
}

function FetchSingleProperty(path, propertyName, targetElementId) {
  fetch(`${root}${path}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      ShowEntityList(data, propertyName, targetElementId);
      //console.log(data, propertyName);
    })
    .catch((error) => {
      console.log(error);
    });
}

function FetchAndLoadProperty(
  path,
  propertyName1,
  propertyName2,
  targetElementId
) {
  fetch(`${root}${path}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      LoadEntityList(data, propertyName1, propertyName2, targetElementId);
      //console.log(data, propertyName);
    })
    .catch((error) => {
      console.log(error);
    });
}

//SHOW ENTITY LIST
function LoadEntityList(list, propertyName1, propertyName2, targetElementId) {
  const optionList = document.getElementById(targetElementId);
  for (let i = 0; i < list.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.innerText = `${list[i][propertyName1]}-${list[i][propertyName2]}`;
    optionList.appendChild(optionElement);
  }
}

function FetchJSON(path) {
  return fetch(`${root}${path}`)
    .then((response) => {
      return response.json(); // Use .then() to handle the JSON promise
    })
    .then((data) => {
      //console.log(data);
      return writeJSON(data);
    })
    .catch((error) => {
      console.log(error);
      throw error; // Re-throw the error so it can be caught by the caller
    });
}

//JSON PARAGRAPH EXAMPLE
function writeJSON(data) {
  try {
    const entityList = document.getElementById("JsonParagraph");

    // Convert the JSON data to a string for display
    const jsonString = JSON.stringify(data);

    const createdParagraph = document.createElement("p");
    createdParagraph.innerText = jsonString;
    //console.log(jsonString);
    entityList.appendChild(createdParagraph);
  } catch (error) {
    console.log(error);
  }
}

function FetchAssignment(targetElementId) {
  return Promise.all([
    fetch(`${root}/Assignment`).then((response) => response.json()),
    fetch(`${root}/User`).then((response) => response.json()),
    fetch(`${root}/AssignmentUser`).then((response) => response.json()),
  ])
    .then(([assignmentsData, usersData, assignmentUsersData]) => {
      const assignments = [];

      // Create a mapping from user IDs to user names
      const userIdToName = {};
      usersData.forEach((user) => {
        userIdToName[user.id] = user.name;
      });

      for (let i = 0; i < assignmentsData.length; i++) {
        const item = assignmentsData[i];
        const assignment = new Assignment(
          item.id,
          item.title,
          item.description,
          item.dueDate,
          item.priority,
          item.status,
          item.projectId,
          [],
          []
        );

        for (let j = 0; j < assignmentUsersData.length; j++) {
          if (assignmentUsersData[j].assignmentId == assignment.id) {
            const userId = assignmentUsersData[j].userId;
            assignment.userIds.push(userId);
            // Add the user name based on the user ID
            assignment.userNames.push(userIdToName[userId]);
          }
        }
        assignments.push(assignment);
      }
      return assignments;
    })
    .then((assignments) => {
      displayAssignment(assignments, targetElementId);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

const checkedCheckboxIds = [];

// Define SelectRowProperty at the global scope
function SelectRowProperty(checkbox) {
  const selectedRow = checkbox.closest("tr");
  const checkedAssignmentIdValue =
    selectedRow.querySelector("td:first-child").textContent;

  if (selectedRow != null) {
    if (!checkedCheckboxIds.includes(checkedAssignmentIdValue)) {
      checkedCheckboxIds.push(checkedAssignmentIdValue);
      console.log(`Added ${checkedAssignmentIdValue}`);
      console.log(checkedCheckboxIds);
    } else {
      const index = checkedCheckboxIds.indexOf(checkedAssignmentIdValue);
      if (index !== -1) {
        checkedCheckboxIds.splice(index, 1); // Remove the value from the array
        console.log(`Removed ${checkedAssignmentIdValue}`);
        console.log(checkedCheckboxIds);
      }
    }
  }
}

// Define SelectRowProperty at the global scope
function SelectRowAllProperty(checkbox) {
  const selectedRow = checkbox.closest("tr");
  const checkedAssignmentIdValue =
    selectedRow.querySelector("td:first-child").textContent;
}

function displayAssignment(assignments, targetElementId) {
  try {
    assignments.forEach((assignment) => {
      const tbody = document.getElementById(targetElementId);
      const tr = document.createElement("tr");
      tbody.appendChild(tr);

      const tdId = document.createElement("td");
      const tdTitle = document.createElement("td");
      const tdAssigneesId = document.createElement("td");
      const tdAssigneesName = document.createElement("td");
      const tdPriority = document.createElement("td");
      const tdStatus = document.createElement("td");
      const tdSelection = document.createElement("td");
      const tdUpdate = document.createElement("td");

      const tdUpdateButton = document.createElement("btn");
      const updateIcon = document.createElement("i");
      updateIcon.classList.add(
        "btn",
        "fa-regular",
        "fa-pen-to-square",
        "fa-lg"
      );

      tdUpdateButton.appendChild(updateIcon);
      tdUpdate.appendChild(tdUpdateButton);

      //Creating a Checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("form-check-input", "bg-dark", "text-light");
      checkbox.addEventListener("change", (e) => {
        if (e.target.type == "checkbox") {
          e.preventDefault();
          SelectRowProperty(e.target);
        }
      });

      tdId.textContent = assignment.id;
      tdTitle.textContent = assignment.title;
      tdAssigneesId.textContent = assignment.userIds;
      tdAssigneesName.textContent = assignment.userNames;
      tdPriority.textContent = assignment.priority;
      tdStatus.textContent = assignment.status;

      // Call ShowRemainingDays to get the td element with the progress bar
      //This method returns a tdElement with progressbar
      const tdRemainingDay = ShowRemainingDays(assignment);

      tdSelection.appendChild(checkbox);
      tr.appendChild(tdId);
      tr.appendChild(tdTitle);
      tr.appendChild(tdAssigneesId);
      tr.appendChild(tdAssigneesName);
      tr.appendChild(tdPriority);
      tr.appendChild(tdStatus);
      tr.appendChild(tdRemainingDay); // Append the progress bar td to the row
      tr.appendChild(tdSelection);
      tr.appendChild(tdUpdate);
    });
  } catch (error) {
    console.log(error);
  }
}
console.log(checkedCheckboxIds);

// Updated ShowRemainingDays function to return the td element
function ShowRemainingDays(assignment) {
  const tdElement = document.createElement("td");

  const dueDate = new Date(assignment.dueDate);
  const timeDifference = dueDate - new Date();
  const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const progressBar = document.createElement("progress");
  progressBar.style.width = "100%";
  progressBar.classList.add("progress", "progress-bar", "bg-success");
  progressBar.style.backgroundColor = "#56799c";
  progressBar.value = remainingDays; // Set the progress value
  progressBar.max = 200; // Set the maximum progress value

  if (remainingDays > 0) {
    tdElement.innerText = `Left: ${remainingDays.toString()} Days`;
  } else {
    tdElement.innerText = `Completed`;
  }
  tdElement.appendChild(progressBar);

  return tdElement; // Return the td element containing the progress bar
}

//Calculate remaining days of assignments and projects
function FetchRemainingDays(path, targetElementId) {
  fetch(`${root}${path}`)
    .then((response) => {
      return response.json();
    })
    .then((assignments) => {
      ShowRemainingDays(assignments, targetElementId);
      console.log(assignments);
    })
    .catch((error) => {
      console.log(error);
    });
}

//JSON PARAGRAPH EXAMPLE
function getJSON(data) {
  try {
    // Convert the JSON data to a string for display
    const jsonString = JSON.stringify(data);
    return jsonString;
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //CREATE ASSIGNMENT
  //ASSIGNMENT  EVENT LISTENER
  const createAssignmentForm = document.getElementById("createAssignmentForm");
  createAssignmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    //PRIORITY
    const selectedPriorityValue = createAssignmentForm.querySelector(
      "#assignmentPriorityInput"
    ).value;
    switch (selectedPriorityValue) {
      case "Unknown":
        selectedPriority = 0;
        break;
      case "Low Priority":
        selectedPriority = 1;
        break;
      case "Neutral":
        selectedPriority = 2;
        break;
      case "High Priority":
        selectedPriority = 3;
        break;
      case "Critical":
        selectedPriority = 4;
        break;
      default:
        break;
    }
    //STATUS
    const selectedStatusValue = createAssignmentForm.querySelector(
      "#assignmentStatusInput"
    ).value;
    switch (selectedStatusValue) {
      case "Pending":
        selectedStatus = 0;
        break;
      case "In Process":
        selectedStatus = 1;
        break;
      case "Completed":
        selectedStatus = 2;
        break;
      case "Canceled":
        selectedStatus = 3;
        break;
      default:
        break;
    }

    //DUE DATE FORMATTER
    let assignmentDueDate = createAssignmentForm.querySelector(
      "#assignmentDueDateInput"
    ).value;
    console.log(assignmentDueDate);

    // const [month, day, year] = assignmentDueDate.split("/");

    // assignmentDueDate = `${year}-${month}-${day}`;
    // //console.log(assignmentDueDate);

    // const isoDueDate = new Date(
    //   assignmentDueDate + "T00:00:00.000Z"
    // ).toISOString();

    const isoDueDate = new Date(
      assignmentDueDate + "T00:00:00.000Z"
    ).toISOString();
    console.log(isoDueDate);

    //Project Id-Name Formatter
    let [projectId, projectName] = createAssignmentForm
      .querySelector("#assignmentProjectIdInput")
      .value.split("-");
    console.log(projectId);

    // Project form values into an anonymous object
    const assignmentData = {
      id: 0,
      title: createAssignmentForm.querySelector("#assignmentTitleInput").value,
      description: createAssignmentForm.querySelector(
        "#assignmentDescriptionInput"
      ).value,
      dueDate: isoDueDate,
      priority: selectedPriority,
      status: selectedStatus,
      projectId: projectId,
    };
    console.log(assignmentData);

    // Make a POST request to your API
    try {
      const response = await fetch(`https://localhost:7001/api/Assignment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignmentData),
      });

      if (response.ok) {
        // Assignment created successfully
        // You can handle the response here
        console.log("Assignment created successfully!");
      } else {
        // Handle error response
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    this.location.reload();
  });

  //DELETE SELECTED ELEMENTS
  const deleteAssignmentButton = document.getElementById(
    "deleteAssignmentButton"
  );

  deleteAssignmentButton.addEventListener("click", (e) => {
    if (checkedCheckboxIds.length === 0) {
      console.error("No assignments have been selected to be removed.");
      return;
    }

    function deleteAssignment(assignmentId) {
      const deleteEndpoint = `https://localhost:7001/api/Assignment/api/removeAssignment?id=${assignmentId}`;
      return fetch(deleteEndpoint, {
        method: "DELETE",
        headers: { accept: "*/*" },
      }).then((response) => {
        if (response.ok) {
          console.log(
            `Assignment with ID ${assignmentId} deleted successfully.`
          );
        } else {
          console.error(
            `Error deleting assignment with ID ${assignmentId}: ${response.status} ${response.statusText}`
          );
        }
      });
    }

    // Use a recursive function to delete assignments one by one
    function deleteAssignmentsSequentially(index) {
      if (index >= checkedCheckboxIds.length) {
        // All assignments have been deleted, reload the page
        location.reload();
        return;
      }

      const assignmentId = checkedCheckboxIds[index];
      deleteAssignment(assignmentId).then(() => {
        // Move on to the next assignment
        deleteAssignmentsSequentially(index + 1);
      });
    }

    // Start deleting assignments sequentially, starting from index 0
    deleteAssignmentsSequentially(0);
  });
});
