import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-dropdown-select';
import './EditJobDetails.css';

const EditJobDetails = ( {job} ) => {
  const data = job;
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [deadline, setDeadline] = useState(data.deadline);
  const [collaborators, setCollaborators] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/find?id=' + localStorage.getItem('id'))
      .then(response => {
        const totalEmployees = response.data;
        const collaboratorIdList = data.collaboratorIds;
        console.log(totalEmployees);
        console.log(collaboratorIdList);
        var alreadyCollaborators = [];
        if (totalEmployees && collaboratorIdList) {
          totalEmployees.forEach(employee => {
            collaboratorIdList.forEach(collaboratorId => {
              if (collaboratorId === employee.id) {
                alreadyCollaborators.push(employee);
              }
            });
          });
        } else {
          console.error("totalEmployees or collaboratorIdList is undefined");
        }
        setCollaborators(totalEmployees);
        setSelectedCollaborators(alreadyCollaborators);
      })
      .catch(error => {
        console.error('There was an error fetching the collaborators!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newJob = {
      'id': data.id,
      'title': title,
      'description': description,
      'managerId': localStorage.getItem('id'),
      'managerName': '',
      'status': 'ASSIGNED',
      'assignedOn': '',
      'deadline': deadline,
      'collaboratorIds': selectedCollaborators.map(collaborator => collaborator.id)
    };

    axios.put('http://localhost:8080/api/updateTaskDetails', newJob)
      .then(response => {
        alert('Project updated successfully!');
        setTitle('');
        setDescription('');
        setDeadline('');
        window.location.reload();
      })
      .catch(error => {
        console.error('There was an error updating the project!', error);
      });
  };

  return (
          <form onSubmit={handleSubmit} className='myForm'>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Deadline:</label>
              <input
                type="datetime-local"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>

            <div className="form-group myBox">
              <label htmlFor="collaborators">Collaborators:</label>
              <Select
                multi
                options={collaborators}
                onChange={setSelectedCollaborators}
                values={selectedCollaborators}
                valueField="id"
                labelField="name"
                searchBy='name'
                searchable="true"
                placeholder="Search and select collaborators"
                required
              />
            </div>
            <button type="submit">Edit Job</button>
          </form>
  );
};

export default EditJobDetails;
