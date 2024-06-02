import React, { useState, useEffect } from 'react';
import axios from "axios";

import './App.css';
import './newApp.css';
import Homepage from './homepage/Homepage';

function App() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('INTERN');

  const [loggedIn, setLoggedIn] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);

  const [email, setEmail] = useState('');
  const [loginPassword, setLoginPasword] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('id');
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  
  const handlePageChange = (event) => {
    event.preventDefault();
    setSignUpPage(!signUpPage);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/api/createEmployee",  {
        'id': '',
        'name': name,
        'email': username,
        'password': password,
        'designation': role
      }
    ).then((response) => {
      alert("User Created, kindly login")
    }).catch((error) => {
      alert("Cannot signup. " + error.message);
    });
  };

  const loginSubmit = (event) => {
    event.preventDefault();
    axios.get("http://localhost:8080/api/validate?email=" + email + "&password=" + loginPassword)
    .then((response) => {
          localStorage.setItem("id", response.data);
          setLoggedIn(true);
      })
      .catch((error) => {
        alert("Email / Password is incorrect. " + error.message);
      });
  };

  return (
    loggedIn
      ? <Homepage />
      : signUpPage
        ? <div className="App">
          <header className="App-header">
            <div className="login-box">
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='name'>Name:</label>
                  <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="email"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor='role'>Designation:</label>
                  <select id="dropdown" value={role} onChange={handleRoleChange}>
                    <option value="INTERN">Intern</option>
                    <option value="MANAGER">Manager</option>
                  </select>
                </div>
                <div className="form-group">
                  <button type="submit">Sign Up</button>
                </div>
              </form>

              <p>Already have an account? <a href="#" onClick={handlePageChange}>Log in</a></p>
            </div>
          </header>
        </div>
        : <div className="App">
          <header className="App-header">
            <div className="login-box">
              <h2>Login</h2>
              <form onSubmit={loginSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPasword(e.target.value)}
                    required
                    />
                </div>
                <div className="form-group">
                  <button type="submit">Login</button>
                </div>
              </form>
              <p>Don't have an account? <a href="#" onClick={handlePageChange}>Sign Up</a></p>
            </div>
          </header>
        </div>

  );
}

export default App;
