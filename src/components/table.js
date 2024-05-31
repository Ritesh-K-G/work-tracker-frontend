import React from 'react';
import { FaArrowRight } from "react-icons/fa";

import './table.css';


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
  return `${formattedDate} at ${formattedTime}`;
};


const Table = (props) => {
  const data = props.data;
  console.log(data);
  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead>
          <tr>
            <th>S. No.</th>
            <th className='expand'>Title</th>
            <th className='expand'>Description</th>
            <th className='expand'>Assignee</th>
            <th>Assigning Date</th>
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
                <td>{obj.description}</td>
                <td>{obj.managerName}</td>
                <td>{formatDateTime(obj.assignedOn)}</td>
                <td>{formatDateTime(obj.deadline)}</td>
                <td>
                  <span className={`label`} style={getStatusStyle(obj.status)}>
                    {obj.status}
                  </span>
                </td>
                <td>1 Hour Ago</td>
                <td>
                  <span className='actions'>
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
