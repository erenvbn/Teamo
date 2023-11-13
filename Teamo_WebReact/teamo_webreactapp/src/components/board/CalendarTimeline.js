import React from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

const CalendarTimeline = () => {
  const groups = [
    { id: 1, title: "Development Team" },
    { id: 2, title: "Design Team" },
    { id: 3, title: "Marketing Team" },
    { id: 4, title: "QA Team" },
    { id: 5, title: "Product Management Team" },
    { id: 6, title: "Customer Support Team" },
    { id: 7, title: "Sales Team" },
    { id: 8, title: "Finance Team" },
    { id: 9, title: "HR Team" },
  ];

  const items = [
    {
      id: 1,
      group: 1,
      title: "Sprint Planning",
      start_time: moment("2023-01-10"),
      end_time: moment("2023-01-15"),
    },
    {
      id: 2,
      group: 2,
      title: "UX Workshop",
      start_time: moment("2023-02-15"),
      end_time: moment("2023-02-20"),
    },
    {
      id: 3,
      group: 3,
      title: "Social Media Campaign",
      start_time: moment("2023-03-01"),
      end_time: moment("2023-03-10"),
    },
    {
      id: 4,
      group: 1,
      title: "Code Review Session",
      start_time: moment("2023-04-05"),
      end_time: moment("2023-04-10"),
    },
    {
      id: 5,
      group: 2,
      title: "Product Launch Event",
      start_time: moment("2023-05-15"),
      end_time: moment("2023-05-20"),
    },
    {
      id: 6,
      group: 4,
      title: "Bug Fixing Marathon",
      start_time: moment("2023-06-01"),
      end_time: moment("2023-06-10"),
    },
    {
      id: 7,
      group: 5,
      title: "Strategic Planning Meeting",
      start_time: moment("2023-07-05"),
      end_time: moment("2023-07-10"),
    },
    {
      id: 8,
      group: 6,
      title: "Employee Training Program",
      start_time: moment("2023-08-01"),
      end_time: moment("2023-08-10"),
    },
    {
      id: 9,
      group: 7,
      title: "Client Acquisition Summit",
      start_time: moment("2023-09-05"),
      end_time: moment("2023-09-10"),
    },
    {
      id: 10,
      group: 8,
      title: "Financial Report Presentation",
      start_time: moment("2023-10-01"),
      end_time: moment("2023-10-10"),
    },
    {
      id: 11,
      group: 9,
      title: "Employee Wellness Workshop",
      start_time: moment("2023-11-05"),
      end_time: moment("2023-11-10"),
    },
  ];

  const timelineStyle = {
    timeline: { background: "#f7f7f7", border: "1px solid #ddd" },
    groupWrapper: { background: "#fff", border: "1px solid #ddd" },
    sidebar: { background: "#333", color: "#fff" },
    date: { background: "#333", color: "#fff" },
    item: { borderColor: "#2196F3", backgroundColor: "#2196F3", color: "#fff" },
    itemText: { color: "#fff" },
    itemTitle: { color: "#fff" },
  };

  return (
    <div>
      <h2>Team Management Project Timeline</h2>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().subtract(6, "months")}
        defaultTimeEnd={moment().add(6, "months")}
        lineHeight={60}
        sidebarWidth={100}
        timelineStyle={timelineStyle}
      />
    </div>
  );
};

export default CalendarTimeline;
