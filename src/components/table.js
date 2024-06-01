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




const Table = (props) => {
  const sampleProject = {
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
  const [detailsPage, setDetailsPage] = useState(false);
  const buttonClick = (event) => {
    event.preventDefault();
    setDetailsPage(true);
  };
  const data = props.data;
  console.log(data);
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
                    <td>1 Hour Ago</td>
                    <td>
                      <span className='actions' onClick={buttonClick}>
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
