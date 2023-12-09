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
    const initialValue = 0;
    // Resetting the counters before fetching new data
    setStatusPendingCounter(initialValue);
    setStatusInProcessCounter(initialValue);
    setStatusCompletedCounter(initialValue);
    setStatusCanceledCounter(initialValue);
    // console.log("Seçili Proje Numarası: " + selectedProjectId);

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
          "rgba(255, 195, 0, 1)",
          "rgba(0, 220, 158, 1)",
          "rgba(149, 51, 255, 1)",
          "rgba(255, 106, 69, 1)",
        ],
        borderColor: [
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
        ],
        borderWidth: 3,
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
          responsive: false,
          position: "right",
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
    <div style={{ width: "18rem", height: "18rem" }}>
      <Doughnut data={data} options={data.options} />
    </div>
  );
}

export default PieChartAnimated;
