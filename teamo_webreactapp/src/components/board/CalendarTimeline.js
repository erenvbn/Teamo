import React, { useState, useEffect, useContext } from "react";
import apiConfig from "../../config/apiconfig";
import apiService from "../../services/apiService";
import { ProjectContext } from "../../store/projectContext";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { splitCommentDate } from "../../utilities/dateUtils";
import moment from "moment";

const CalendarTimeline = () => {
  const [assignments, setAssignments] = useState([]);
  const [assignmentsInCalendar, setAssignmentsInCalendar] = useState([]);
  const [items, setItems] = useState([]);
  const { selectedProjectId } = useContext(ProjectContext);
  const [assignmentStartDate, setAssignmentStartDate] = useState(
    moment("2023-01-01")
  );
  const [assignmentDueDate, setAssignmentDueDate] = useState(
    moment("2023-12-31")
  );

  useEffect(() => {
    if (selectedProjectId !== null) {
      apiService
        .get(apiConfig.getAssignments)
        .then((res) => {
          const filteredAssignments = res.data.filter(
            (assignment) => assignment.projectId === selectedProjectId
          );
          setAssignments(filteredAssignments);
          // console.log("filteredAssignments");
          // console.log(filteredAssignments);
        })
        .catch((error) => {
          console.error("Error fetching assignment data: ", error);
        });
    }
  }, [selectedProjectId]);



  useEffect(() => {
    const assignmentsInCalendar = assignments.map((a) => ({
      id: a.id,
      title: a.title,
    }));
    setAssignmentsInCalendar(assignmentsInCalendar);

    const startTimes = assignments.map((a) =>
      moment(splitCommentDate(a.startDate)[0])
    );
    const endTimes = assignments.map((a) =>
      moment(splitCommentDate(a.dueDate)[0])
    );

    const startTimeCalendar = moment.min(startTimes);
    const endTimeCalendar = moment.max(endTimes);

    const items = assignments.map((a) => ({
      id: a.id,
      group: a.id,
      title: a.title,
      start_time: moment(splitCommentDate(a.startDate)[0]),
      end_time: moment(splitCommentDate(a.dueDate)[0]),
    }));
    setItems(items);

    // Update defaultTimeStart and defaultTimeEnd
    setAssignmentStartDate(startTimeCalendar);
    setAssignmentDueDate(endTimeCalendar);

  }, [assignments]);

  // console.log(items);
  const timelineStyle = {
    timeline: { background: "#f7f7f7", border: "1px solid #ddd" },
    groupWrapper: { background: "#fff", border: "1px solid #ddd" },
    sidebar: { background: "#333", color: "#fff" },
    date: { background: "#333", color: "#fff" },
    item: { borderColor: "#2196F3", backgroundColor: "#2196F3", color: "#fff" },
    itemText: { color: "#fff" },
    itemTitle: { color: "#fff" },
  };

  const handleTimeChange = (
    visibleTimeStart,
    visibleTimeEnd,
    updateScrollCanvas
  ) => {
    const minTime = moment().startOf("day").valueOf();
    const maxTime = moment().add(3, "months").valueOf();

    let adjustedStart = visibleTimeStart;
    let adjustedEnd = visibleTimeEnd;

    if (visibleTimeStart < minTime) {
      adjustedStart = minTime;
      adjustedEnd = minTime + (visibleTimeEnd - visibleTimeStart);
    } else if (visibleTimeEnd > maxTime) {
      adjustedEnd = maxTime;
      adjustedStart = maxTime - (visibleTimeEnd - visibleTimeStart);
    }

    updateScrollCanvas(adjustedStart, adjustedEnd);
  };

  return (
    <div>
      <h2>Project Timeline</h2>
      <div style={{ height: "500px", width: "80%" }}>
        <Timeline
          groups={assignmentsInCalendar}
          items={items}
          defaultTimeStart={assignmentStartDate}
          defaultTimeEnd={assignmentDueDate}
          onTimeChange={handleTimeChange}
          timelineStyle={timelineStyle}
        />
      </div>
    </div>
  );
};

export default CalendarTimeline;
