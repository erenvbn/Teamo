import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ProjectContext } from "../../store/projectContext";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";

function PieChartAnimated() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const selectedProjectId = useContext(ProjectContext).selectedProjectId;

  const [statusPendingCounter, setStatusPendingCounter] = useState(0);
  const [statusInProcessCounter, setStatusInProcessCounter] = useState(0);
  const [statusCompletedCounter, setStatusCompletedCounter] = useState(0);
  const [statusCanceledCounter, setStatusCanceledCounter] = useState(0);

  // Fetch and update data when the selectedProjectId changes
  useEffect(() => {
    // Resetting the counters before fetching new data
    setStatusPendingCounter(0);
    setStatusInProcessCounter(0);
    setStatusCompletedCounter(0);
    setStatusCanceledCounter(0);

    apiService
      .get(apiConfig.getProjectAssignments + `/${selectedProjectId}`)
      .then((res) => {
        res.data.forEach((assignment) => {
          if (assignment.status === 1) {
            setStatusPendingCounter((prevCounter) => prevCounter + 1);
          } else if (assignment.status === 2) {
            setStatusInProcessCounter((prevCounter) => prevCounter + 1);
          } else if (assignment.status === 3) {
            setStatusCompletedCounter((prevCounter) => prevCounter + 1);
          } else if (assignment.status === 4) {
            setStatusCanceledCounter((prevCounter) => prevCounter + 1);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching project data: ", error);
      });
  }, [selectedProjectId]);

  const data = {
    labels: ["Pending", "In Process", "Completed", "Cancelled"],
    datasets: [
      {
        label: "# of Task",
        data: [
          statusPendingCounter,
          statusInProcessCounter,
          statusCompletedCounter,
          statusCanceledCounter,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
    options: {
      plugins: {
        tooltip: {
          titleFont: {
            size: 11,
          },
          bodyFont: {
            size: 11,
          },
        },
        legend: {
          display: true,
          responsive: true,
          position: "top",
          labels: {
            boxWidth: 12,
            padding: 7,
            font: {
              size: 10,
            },
          },
          align: "center",
        },
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={data.options} />
    </div>
  );
}

export default PieChartAnimated;
