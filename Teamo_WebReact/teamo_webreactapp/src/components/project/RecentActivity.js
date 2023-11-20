import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../store/projectContext";
import ProjectComment from "../comment/ProjectComment";
import apiService from "../../services/apiService";
import apiConfig from "../../config/apiconfig";
import { splitCommentDate } from "../../utilities/dateUtils";

function RecentActivity() {
  const { selectedProjectId, selectedProjectData } = useContext(ProjectContext);
  const [projectComments, setProjectComments] = useState([]);
  const [commentDateDay, setCommentDateDay] = useState("");
  const [commentDateHour, setCommentDateHour] = useState("");

  useEffect(() => {
    apiService
      .get(apiConfig.getProjectComments + `/${selectedProjectId}`)
      .then((res) => {
        setProjectComments(res.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment data: ", error);
      });
  }, [selectedProjectId]);

  return (
    <div>
      {projectComments.map((comment) => {
        const [commentDateDay, commentDateHour] = splitCommentDate(
          comment.commentDate
        );
        return (
          <div key={comment.commentId}>
            <ProjectComment
              selectedProjectId={selectedProjectId}
              assignmentId={comment.assignmentId}
              commentText={comment.commentText}
              userName={comment.userName}
              commentDate={commentDateDay}
              commentDateHour={commentDateHour}
            ></ProjectComment>
          </div>
        );
      })}
    </div>
  );
}

export default RecentActivity;
