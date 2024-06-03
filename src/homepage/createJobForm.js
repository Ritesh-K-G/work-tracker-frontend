import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-dropdown-select';
import './createJobForm.css';

const CreateJobForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/find?id=' + localStorage.getItem('id'))
      .then(response => {
        setCollaborators(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the collaborators!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newJob = {
      'id': '',
      'title': title,
      'description': description,
      'managerId': localStorage.getItem('id'),
      'managerName': '',
      'status': 'ASSIGNED',
      'assignedOn': '',
      'deadline': deadline,
      'collaboratorIds': selectedCollaborators.map(collaborator => collaborator.id)
    };

    axios.post('http://localhost:8080/api/createTask', newJob)
      .then(response => {
        alert('Job created successfully!');
        setTitle('');
        setDescription('');
        setDeadline('');
        setSelectedCollaborators([]);
      })
      .catch(error => {
        console.error('There was an error creating the job!', error);
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
        />
      </div>
      <button type="submit">Create Job</button>
    </form>
  );
};

export default CreateJobForm;
