import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

import { FaArrowRight } from "react-icons/fa";
import './table.css';
import ProjectDetailsComponent from "./projectDetails/ProjectDetailsComponent";


const getStatusStyle = (status) => {
  switch (status) {
    case 'ASSIGNED':
      return { backgroundColor: 'red' };
    case 'RECEIVED':
      return { backgroundColor: 'orange' };
    case 'ACCEPTED':
      return { backgroundColor: 'chartreuse' };
    case 'IN_PROGRESS':
      return { backgroundColor: 'tomato' };
    case 'COMPLETED':
      return { backgroundColor: 'green' };
    default:
      return {};
  }
};

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date);
  const formattedTime = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(date);
  return `${formattedTime} ${formattedDate}`;
};

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


const Table = (props) => {
  const temp = {
    title: 'Project Alpha',
    description: 'This is a sample project description.',
    manager: 'Jane Doe',
    collaborators: ['John Smith', 'Emily Davis', 'Michael Brown'],
    assigningDate: '2024-05-01T00:00:00Z',
    deadline: '2024-06-30T00:00:00Z',
    lastUpdate: '2024-05-15T12:34:56Z',
    completionTime: null,
    status: 'Incomplete'
  };

  const [sampleProject, setSampleProject] = useState(temp);
  
  const [detailsPage, setDetailsPage] = useState(false);

  const data = props.data;
  
  return (
    detailsPage
      ? <ProjectDetailsComponent project={sampleProject} />
      : <div className='table-wrapper'>
          <table className='table'>
            <thead>
              <tr>
                <th>S. No.</th>
                <th className='expand'>Title</th>
                <th className='expand'>Assignee</th>
                <th>Deadline</th>
                <th>Status</th>
                <th className='expand'>Last Update</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((obj, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{obj.title}</td>
                    <td>{obj.managerName}</td>
                    <td>{formatDateTime(obj.deadline)}</td>
                    <td>
                      <span className={`label`} style={getStatusStyle(obj.status)}>
                        {obj.status}
                      </span>
                    </td>
                    <td>{timeAgo(obj.lastStatusUpdateOn)}</td>
                    <td>
                      <span className='actions' onClick={() => {
                        setSampleProject(obj);
                        console.log(obj);
                        setDetailsPage(true);
                      }}>
                        More Details...
                        <FaArrowRight />
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
  );
};

export default Table;
