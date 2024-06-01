import React, { useState } from 'react';
import './ProjectDetailsComponent.css'; // Assuming you will style the component using this CSS file

const ProjectDetailsComponent = ({ project }) => {
  const [status, setStatus] = useState(project.status);

  const handleUpdateStatus = () => {
    // Here you can add logic to update the status, e.g., open a modal or make an API call
    console.log('Update status clicked');
    // For now, let's just toggle the status for demonstration
    setStatus(prevStatus => (prevStatus === 'Incomplete' ? 'Complete' : 'Incomplete'));
  };

  return (
    <div className="project-details">
      <h1>{project.title}</h1>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Manager:</strong> {project.manager}</p>
      <p><strong>Collaborators:</strong></p>
      <ul>
        {project.collaborators.map((collaborator, index) => (
          <li key={index}>{collaborator}</li>
        ))}
      </ul>
      <p><strong>Assigning Date:</strong> {new Date(project.assigningDate).toLocaleDateString()}</p>
      <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
      <p><strong>Last Update:</strong> {new Date(project.lastUpdate).toLocaleString()}</p>
      <p><strong>Completion Time:</strong> {project.completionTime ? new Date(project.completionTime).toLocaleString() : 'Not completed yet'}</p>
      <button onClick={handleUpdateStatus}>Update Status</button>
    </div>
  );
};

export default ProjectDetailsComponent;
