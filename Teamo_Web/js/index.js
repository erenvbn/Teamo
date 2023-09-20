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

function FetchAssignment() {
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
      displayAssignment(assignments);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

// JSON PARAGRAPH EXAMPLE
function displayAssignment(assignments) {
  try {
    assignments.forEach((assignment) => {
      const tbody = document.getElementById("tbodyAssignment");
      const tr = document.createElement("tr");
      tbody.append(tr);
      
      const tdId = document.createElement("td");
      const tdTitle = document.createElement("td");
      const tdAssigneesId = document.createElement("td");
      const tdAssigneesName = document.createElement("td");

      tdId.textContent = assignment.id;
      tdTitle.textContent = assignment.title;
      tdAssigneesId.textContent = assignment.userIds;
      tdAssigneesName.textContent = assignment.userNames;

      tr.appendChild(tdId);
      tr.appendChild(tdTitle);
      tr.appendChild(tdAssigneesId);
      tr.appendChild(tdAssigneesName);
    });
  } catch (error) {
    console.log(error);
  }
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

//SHOWING REMAINING DAYS
function ShowRemainingDays(list, targetElementId) {
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
    const dueDate = new Date(list[i].dueDate);
    const timeDifference = dueDate - currentDate;
    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const progressBar = document.createElement("progress");
    progressBar.style.width = "60%";
    progressBar.classList.add(
      "progress",
      "progress-bar",
      "progress-bar-striped",
      "bg-success"
    );
    progressBar.value = remainingDays; // Set the progress value
    progressBar.max = 200; // Set the maximum progress value

    liElement.innerText = `Remaining Days: ${remainingDays.toString()}`;
    liElement.appendChild(progressBar);
    entityList.appendChild(liElement);
  }
}

//Calculate remaining days of assignments and projects
function FetchRemainingDays(path, targetElementId) {
  fetch(`${root}${path}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      ShowRemainingDays(data, targetElementId);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
