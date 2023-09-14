function ShowAssignmentList(list) {
    const assignmentList = document.getElementById("AssignmentList");
    for (let i = 0; i < list.length; i++) {
      const liElement = document.createElement("li");
      liElement.innerText = list[i].title;
      assignmentList.appendChild(liElement);
    }
  }
  

  const root = "https://localhost:7001/api";

  function FetchData(path) {
    fetch(`${root}/${path}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        ShowAssignmentList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }