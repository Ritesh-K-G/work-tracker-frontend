import React, { useState, useEffect } from 'react';
import './ProjectDetailsComponent.css';
import EditJobDetails from './EditJobDetails.js';
import axios from 'axios';
import CommentList from './comments.js';
import ShowChart from './showChart.js';

const ProjectDetailsComponent = ({ project }) => {
  const [status, setStatus] = useState(project.status);
  const [userId, setUserId] = useState('');
  const [editProjectPage, setEditProjectPage] = useState(false);
  const [commentList, setCommentList] = useState(project.commentList);

  useEffect(() => {
    const user = localStorage.getItem('id');
    if (user) {
      setUserId(user);
    }
  }, []);

  const timeAgo = (date) => {
    const now = new Date();
    const givenDate = new Date(date);
    const difference = now - givenDate;
  
    if (difference < 0) {
      return "In the future";
    }
  
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return years + (years === 1 ? " year ago" : " years ago");
    } else if (months > 0) {
      return months + (months === 1 ? " month ago" : " months ago");
    } else if (days > 0) {
      return days + (days === 1 ? " day ago" : " days ago");
    } else if (hours > 0) {
      return hours + (hours === 1 ? " hour ago" : " hours ago");
    } else if (minutes > 0) {
      return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    } else {
      return seconds + (seconds === 1 ? " second ago" : " seconds ago");
    }
  };

  const handleUpdateStatus = (obj) => {
    axios.put(`http://localhost:8080/api/updateTaskStatus?Id=${obj.id}`)
      .then((response) => {
        alert("Project Status Updated");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
        window.location.reload();
      });
  };

  const editProjectClick = (obj) => {
    setEditProjectPage(true);
  }

  const [newComment, setNewComment] = useState('');

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    const newCommentObj = {
      "taskId": project.id,
      "commentatorName": 'Me',
      "comment": newComment
    };
    const commentObj = {
      "commentatorName": 'Me',
      "time": new Date(),
      "comment": newComment
    };
    axios.post('http://localhost:8080/api/addComment?id=' + localStorage.getItem('id'), newCommentObj)
      .then(() => {
        const updatedCommentList = [...commentList, commentObj];
        setCommentList(updatedCommentList);
      })
      .catch((error) => {
        alert('Comment cannot be added');
      })
    console.log('New comment:', newComment);
    setNewComment('');
  };

  const reassign = () => {
    axios.put('http://localhost:8080/api/reassign?id=' + project.id)
      .then((response) => {
        alert("Project Reassigned to the collaborators");
        window.location.reload();
      })
      .catch((error) => {
        alert("Some error occured, "+ error.message);
      })
  };

  return (
    editProjectPage
      ? <EditJobDetails job={project} />
      : <div className="project-details">
          <h1>{project.title}</h1>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Manager:</strong> {project.managerName}</p>
          <p><strong>Collaborators:</strong></p>
          <ul>
            {project.collaboratorNames.map((collaborator, index) => (
              <li key={index}>{collaborator}</li>
            ))}
          </ul>
          <p><strong>Assigning Date:</strong> {new Date(project.assignedOn).toLocaleDateString()}</p>
          <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
          <p><strong>Last Update:</strong> {timeAgo(project.lastStatusUpdateOn)}</p>
          <p><strong>Completion Time:</strong> {project.completedOn ? new Date(project.completedOn).toLocaleString() : 'Not completed yet'}</p>
          <ShowChart rawData={project.updatesTimeline}/>
          {project.managerId !== userId && project.status != "COMPLETED" && <button onClick={() => handleUpdateStatus(project)}>Update Status</button>}
          {project.managerId == userId && project.status == "COMPLETED" && <button onClick={() => handleUpdateStatus(project)}>Accept Project</button>}
          {project.managerId == userId && project.status == "COMPLETED" && <button style={{backgroundColor: 'red'}} onClick={() => reassign()}>Reassign Project</button>}
          {project.managerId == userId && project.status != "ACCEPTED" && <button onClick={() => editProjectClick(project)}>Edit Project Details</button>}
          <div>
            <CommentList comments={commentList}/>
          </div>
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={handleInputChange}
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>
  );
};

export default ProjectDetailsComponent;
